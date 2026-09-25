import { TOKEN_DESCRIPTIONS, TOKEN_GROUPS } from './design-tokens.generated';

export interface TokenRow {
  name: string;
  cssVar: string;
  description: string;
}

export interface ResolvedTokenRow extends TokenRow {
  value: string;
}

const TEXT_STYLE_PROPERTY =
  /-(font-family|font-weight|font-size|line-height|text-decoration|text-case|letter-spacing)$/;
const TEXT_STYLE_DESCRIPTION_SOURCES = ['font-family', 'font-weight', 'font-size', 'line-height'];

const cache = new Map<string, TokenRow[]>();

export function humanize(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function tokenRows(group: string): TokenRow[] {
  const cached = cache.get(group);
  if (cached) return cached;

  const rows =
    group === 'text-style'
      ? (TOKEN_GROUPS['text-style'] ?? [])
          .filter((suffix) => !TEXT_STYLE_PROPERTY.test(suffix))
          .map((stem) => ({
            name: stem,
            cssVar: `--text-style-${stem}`,
            description:
              TEXT_STYLE_DESCRIPTION_SOURCES.map(
                (prop) => TOKEN_DESCRIPTIONS[`text-style-${stem}-${prop}`],
              ).find(Boolean) ?? humanize(stem),
          }))
      : (TOKEN_GROUPS[group] ?? []).map((suffix) => ({
          name: suffix,
          cssVar: `--${group}-${suffix}`,
          description: TOKEN_DESCRIPTIONS[`${group}-${suffix}`] ?? humanize(suffix),
        }));

  cache.set(group, rows);
  return rows;
}

export function normalizeTerm(term: string): string {
  return term.trim().toLowerCase();
}

export function matchesTerm(row: TokenRow, term: string): boolean {
  if (!term) return true;
  return (
    row.cssVar.toLowerCase().includes(term) || row.description.toLowerCase().includes(term)
  );
}

export function filterRows(group: string, term: string): TokenRow[] {
  const normalized = normalizeTerm(term);
  const rows = tokenRows(group);
  return normalized ? rows.filter((row) => matchesTerm(row, normalized)) : rows;
}

export function resolveRows(rows: TokenRow[]): ResolvedTokenRow[] {
  const styles = getComputedStyle(document.documentElement);
  return rows.map((row) => ({
    ...row,
    value: styles.getPropertyValue(row.cssVar).trim() || '—',
  }));
}
