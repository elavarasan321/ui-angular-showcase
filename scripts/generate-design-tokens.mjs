import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const APP_ROOT = resolve(__dirname, '..');
const DARK_CSS_PATH = resolve(
  APP_ROOT,
  'node_modules/@checkworkrights/design-tokens/dist/dark.css',
);
const OUT_PATH = resolve(APP_ROOT, 'src/app/pages/design-tokens/design-tokens.generated.ts');

// Longest prefix wins, so more specific buckets (e.g. `border-radius-`) are
// pulled out before the generic composite bucket (`border-`) claims the rest.
const PREFIXES = [
  'color-bg-',
  'color-text-',
  'color-icon-',
  'color-border-',
  'color-shadow-',
  'color-utility-',
  'border-radius-',
  'border-width-',
  'border-',
  'palette-accent-seed-',
  'palette-neutral-seed-',
  'palette-accent-light-',
  'palette-accent-dark-',
  'palette-neutral-light-',
  'palette-neutral-dark-',
  'text-style-',
  'space-',
  'size-icon-',
  'size-',
  'opacity-',
  'timing-duration-',
  'timing-delay-',
  'timing-timing-function-',
  'transition-',
  'breakpoint-',
  'box-shadow-elevation-',
  'font-family-',
  'font-weight-',
  'font-size-',
  'font-line-height-',
  'font-letter-spacing-',
  'font-text-case-',
  'font-text-decoration-',
  'dimensions-rem-',
  'dimensions-fixed-',
  'scale-unitless-',
  'scale-density-multiplier-',
].sort((a, b) => b.length - a.length);

if (!existsSync(DARK_CSS_PATH)) {
  console.error(
    `[generate-design-tokens] ${DARK_CSS_PATH} not found. Run yalc:push in @checkworkrights/design-tokens first.`,
  );
  process.exit(1);
}

const css = readFileSync(DARK_CSS_PATH, 'utf8');
const tokenRe = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);(?:\s*\/\*\*\s*([\s\S]*?)\s*\*\/)?/g;

// Raw icon/illustration tokens hold Font Awesome class names, not CSS values —
// keep them out of the generated page.
const EXCLUDED_PREFIXES = ['icon-', 'illustration-'];

const names = [];
const descriptions = {};
let match;
while ((match = tokenRe.exec(css))) {
  const [, name, , description] = match;
  if (EXCLUDED_PREFIXES.some(p => name.startsWith(p))) continue;
  if (!names.includes(name)) names.push(name);
  if (description) descriptions[name] = description.trim();
}

const groups = {};
for (const name of names) {
  const prefix = PREFIXES.find(p => name.startsWith(p));
  if (!prefix) continue;
  const key = prefix.replace(/-$/, '');
  const suffix = name.slice(prefix.length);
  (groups[key] ||= []).push(suffix);
}

const banner =
  '// GENERATED FILE — do not edit by hand. Run `npm run generate:tokens` to regenerate.\n';
const contents =
  `${banner}\n` +
  `export const TOKEN_GROUPS: Record<string, string[]> = ${JSON.stringify(groups, null, 2)};\n\n` +
  `export const TOKEN_DESCRIPTIONS: Record<string, string> = ${JSON.stringify(descriptions, null, 2)};\n`;

writeFileSync(OUT_PATH, contents);

const groupCount = Object.keys(groups).length;
const tokenCount = names.length;
console.log(
  `[generate-design-tokens] wrote ${OUT_PATH} — ${groupCount} groups from ${tokenCount} tokens.`,
);
