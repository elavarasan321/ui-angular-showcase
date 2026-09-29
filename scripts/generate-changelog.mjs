// Builds the changelog page data from the CHANGELOG.md shipped in the installed
// @checkworkrights/ui-angular package, so the page always matches the library version the app runs.
//
// The file follows Keep a Changelog: `## [version] - date` releases, `### Added`-style sections and
// nested `-` lists. Only that subset of Markdown is converted (lists, **bold**, `code`, links);
// every line is HTML-escaped first, so nothing in the file is injected as raw HTML.
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHANGELOG_PATH = resolve(APP_ROOT, 'node_modules/@checkworkrights/ui-angular/CHANGELOG.md');
const OUT_PATH = resolve(APP_ROOT, 'src/app/pages/changelog/changelog.generated.ts');

const releases = existsSync(CHANGELOG_PATH) ? parse(readFileSync(CHANGELOG_PATH, 'utf8')) : [];
if (!existsSync(CHANGELOG_PATH)) {
  console.warn(`[generate-changelog] ${CHANGELOG_PATH} not found; writing an empty changelog.`);
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function inline(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

/** Turns `- item` lines (nested by indentation) into `<ul>` HTML; other lines become paragraphs. */
function blockToHtml(lines) {
  let html = '';
  const depths = []; // indentation of each open <ul>
  const closeTo = (indent) => {
    while (depths.length && depths[depths.length - 1] > indent) {
      html += '</li></ul>';
      depths.pop();
    }
  };
  for (const line of lines) {
    const item = line.match(/^(\s*)[-*] (.*)$/);
    if (!item) {
      closeTo(-1);
      if (line.trim()) html += `<p>${inline(line.trim())}</p>`;
      continue;
    }
    const indent = item[1].length;
    closeTo(indent);
    if (!depths.length || depths[depths.length - 1] < indent) {
      html += '<ul><li>';
      depths.push(indent);
    } else {
      html += '</li><li>';
    }
    html += inline(item[2]);
  }
  closeTo(-1);
  return html;
}

function parse(markdown) {
  const out = [];
  let release;
  let section;
  for (const line of markdown.split(/\r?\n/)) {
    const releaseMatch = line.match(/^## \[?([^\]\s]+)\]?(?:\s*-\s*(\S+))?/);
    if (releaseMatch) {
      release = { version: releaseMatch[1], date: releaseMatch[2], sections: [] };
      section = undefined;
      out.push(release);
      continue;
    }
    if (!release || /^-{3,}\s*$/.test(line)) continue;
    const sectionMatch = line.match(/^### (.+)$/);
    if (sectionMatch) {
      section = { title: sectionMatch[1].trim(), lines: [] };
      release.sections.push(section);
      continue;
    }
    if (!section) {
      section = { title: '', lines: [] };
      release.sections.push(section);
    }
    section.lines.push(line);
  }
  return out.map((r) => ({
    version: r.version,
    ...(r.date ? { date: r.date } : {}),
    sections: r.sections
      .map((s) => ({ title: s.title, html: blockToHtml(s.lines) }))
      .filter((s) => s.html),
  }));
}

writeFileSync(
  OUT_PATH,
  `// GENERATED FILE — do not edit by hand. Run \`npm run generate:changelog\` to regenerate.

export interface ChangelogSection {
  /** "Added", "Changed", …; empty for notes that come before the first section heading. */
  title: string;
  /** Pre-rendered, HTML-escaped list markup. */
  html: string;
}

export interface ChangelogRelease {
  /** A semver version, or "Unreleased". */
  version: string;
  date?: string;
  sections: ChangelogSection[];
}

export const CHANGELOG: ChangelogRelease[] = ${JSON.stringify(releases, null, 2)};
`,
);
console.log(`[generate-changelog] wrote ${OUT_PATH} — ${releases.length} releases.`);
