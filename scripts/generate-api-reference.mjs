// Builds the per-component API tables (inputs, outputs, types, defaults, docs) shown on each
// showcase page, straight from the installed @checkworkrights/ui-angular package, so the tables
// can't drift from the version the app actually runs.
//
// - Inputs/outputs and their public aliases come from each class's `ɵcmp`/`ɵdir` declaration.
// - Types prefer the matching `*Props` interface (it's written with the library's alias names,
//   e.g. `ButtonIconKey`), falling back to the class member's signal type.
// - Defaults come from the `input(default)` / `model(default)` initializers in the bundle,
//   since the .d.ts doesn't keep them.
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PKG_ROOT = resolve(APP_ROOT, 'node_modules/@checkworkrights/ui-angular');
const DTS_PATH = resolve(PKG_ROOT, 'types/checkworkrights-ui-angular.d.ts');
const MJS_PATH = resolve(PKG_ROOT, 'fesm2022/checkworkrights-ui-angular.mjs');
const OUT_PATH = resolve(APP_ROOT, 'src/app/pages/showcase/api-reference.generated.ts');
// Kept separate so the sidebar can show the version without pulling every table into the
// initial bundle (the tables are only needed by the lazy-loaded showcase pages).
const VERSION_OUT_PATH = resolve(APP_ROOT, 'src/app/library-version.generated.ts');

for (const p of [DTS_PATH, MJS_PATH]) {
  if (!existsSync(p)) {
    console.error(`[generate-api-reference] ${p} not found. Install @checkworkrights/ui-angular first.`);
    process.exit(1);
  }
}

const version = JSON.parse(readFileSync(resolve(PKG_ROOT, 'package.json'), 'utf8')).version;
const dts = ts.createSourceFile(DTS_PATH, readFileSync(DTS_PATH, 'utf8'), ts.ScriptTarget.Latest, true);
const mjs = ts.createSourceFile(MJS_PATH, readFileSync(MJS_PATH, 'utf8'), ts.ScriptTarget.Latest, true);

const memberName = (m) => (m.name && (ts.isIdentifier(m.name) || ts.isStringLiteral(m.name)) ? m.name.text : undefined);
const clean = (text) => text.replace(/_angular_core\./g, '').replace(/\s+/g, ' ').trim();

function jsDoc(node) {
  const docs = ts.getJSDocCommentsAndTags(node).filter(ts.isJSDoc);
  if (!docs.length) return {};
  const doc = docs[docs.length - 1];
  const description = typeof doc.comment === 'string' ? doc.comment : ts.getTextOfJSDocComment(doc.comment);
  const defTag = doc.tags?.find((t) => t.tagName.text === 'default');
  const def = defTag ? (typeof defTag.comment === 'string' ? defTag.comment : ts.getTextOfJSDocComment(defTag.comment)) : undefined;
  return { description: description?.replace(/\s+/g, ' ').trim() || undefined, default: def?.trim() || undefined };
}

// Long literal unions (every icon key, every color token…) are unreadable in a table: name the
// family when it's recognisable, otherwise show the first few members.
const LITERAL_FAMILIES = [
  [/^'icon\./, 'IconKey'],
  [/^'illustration\./, 'IllustrationKey'],
  [/^'color\./, 'ColorToken'],
];
function shortenType(typeNode) {
  if (!typeNode) return 'unknown';
  if (ts.isUnionTypeNode(typeNode)) {
    const parts = [];
    const families = new Set();
    for (const t of typeNode.types) {
      const text = clean(t.getText());
      const fam = LITERAL_FAMILIES.find(([re]) => re.test(text) || re.test(text.replace(/^"/, "'")));
      if (fam) families.add(fam[1]);
      else parts.push(text.replace(/^"(.*)"$/, "'$1'"));
    }
    const all = [...families, ...parts];
    if (all.length > 10) return `${all.slice(0, 6).join(' | ')} | … (${all.length - 6} more)`;
    return all.join(' | ');
  }
  return clean(typeNode.getText()).replace(/"([^"]*)"/g, "'$1'");
}

// Unwraps InputSignal<T>, InputSignalWithTransform<T, W> (shows the write type W), ModelSignal<T>,
// OutputEmitterRef<T>, EventEmitter<T>, OutputRef<T>.
function unwrapSignalType(typeNode) {
  if (typeNode && ts.isTypeReferenceNode(typeNode)) {
    const name = clean(typeNode.typeName.getText());
    const args = typeNode.typeArguments ?? [];
    if (name === 'InputSignalWithTransform' && args[1]) return args[1];
    if (['InputSignal', 'ModelSignal', 'OutputEmitterRef', 'EventEmitter', 'OutputRef'].includes(name) && args[0]) {
      return args[0];
    }
  }
  return typeNode;
}

// ---- Type aliases → allowed literal values ----
// Resolves `type ButtonVariant = 'solid' | 'outline'` and the library's const-tuple pattern
// `type ToggleState = (typeof TOGGLE_STATES)[number]` so tables can list the allowed values.
const MAX_VALUES = 12;
const aliasNodes = new Map();
const constTuples = new Map();
for (const stmt of dts.statements) {
  if (ts.isTypeAliasDeclaration(stmt)) aliasNodes.set(stmt.name.text, stmt.type);
  if (ts.isVariableStatement(stmt)) {
    for (const d of stmt.declarationList.declarations) {
      let t = d.type;
      if (t && ts.isTypeOperatorNode(t)) t = t.type;
      if (t && ts.isTupleTypeNode(t) && ts.isIdentifier(d.name)) constTuples.set(d.name.text, t.elements);
    }
  }
}
function literalValues(typeNode, seen = new Set()) {
  if (!typeNode) return undefined;
  if (ts.isParenthesizedTypeNode(typeNode)) return literalValues(typeNode.type, seen);
  if (ts.isLiteralTypeNode(typeNode) && ts.isStringLiteral(typeNode.literal)) return [`'${typeNode.literal.text}'`];
  if (ts.isLiteralTypeNode(typeNode) && ts.isNumericLiteral(typeNode.literal)) return [typeNode.literal.text];
  if (ts.isUnionTypeNode(typeNode)) {
    const out = [];
    for (const t of typeNode.types) {
      const v = literalValues(t, seen);
      if (!v) return undefined;
      out.push(...v);
    }
    return out;
  }
  if (ts.isIndexedAccessTypeNode(typeNode)) {
    // (typeof CONST)[number]
    let obj = typeNode.objectType;
    if (ts.isParenthesizedTypeNode(obj)) obj = obj.type;
    if (ts.isTypeQueryNode(obj)) {
      const els = constTuples.get(obj.exprName.getText());
      if (els) return literalValues(ts.factory.createUnionTypeNode([...els]), seen);
    }
    return undefined;
  }
  if (ts.isTypeReferenceNode(typeNode) && !typeNode.typeArguments) {
    const name = typeNode.typeName.getText();
    if (seen.has(name) || !aliasNodes.has(name)) return undefined;
    seen.add(name);
    return literalValues(aliasNodes.get(name), seen);
  }
  return undefined;
}
function valuesFor(typeNode) {
  const v = literalValues(typeNode);
  return v && v.length > 1 && v.length <= MAX_VALUES ? [...new Set(v)] : undefined;
}

// ---- Props interfaces (for nicer type names + docs) ----
const propsInterfaces = new Map();
for (const stmt of dts.statements) {
  if (ts.isInterfaceDeclaration(stmt) && stmt.name.text.endsWith('Props')) {
    const members = new Map();
    for (const m of stmt.members) if (memberName(m)) members.set(memberName(m), m);
    propsInterfaces.set(stmt.name.text, members);
  }
}

// ---- Defaults from the bundle ----
const bundleDefaults = new Map(); // className -> Map(prop -> default text | REQUIRED)
const REQUIRED = Symbol('required');
function visitBundle(node) {
  if (ts.isClassDeclaration(node) && node.name) {
    const map = new Map();
    for (const m of node.members) {
      if (!ts.isPropertyDeclaration(m) || !m.initializer || !memberName(m)) continue;
      const init = m.initializer;
      if (!ts.isCallExpression(init)) {
        // Decorator-style `@Input() collapsed = false;` keeps its initializer as a plain field.
        map.set(memberName(m), clean(init.getText(mjs)));
        continue;
      }
      const callee = init.expression.getText(mjs);
      if (callee === 'input.required' || callee === 'model.required') map.set(memberName(m), REQUIRED);
      else if (callee === 'input' || callee === 'model') {
        const first = init.arguments[0];
        if (first && !ts.isSpreadElement(first)) map.set(memberName(m), clean(first.getText(mjs)));
      }
    }
    bundleDefaults.set(node.name.text, map);
  }
  ts.forEachChild(node, visitBundle);
}
visitBundle(mjs);

// ---- Components/directives ----
const reference = {};
for (const stmt of dts.statements) {
  if (!ts.isClassDeclaration(stmt) || !stmt.name) continue;
  const className = stmt.name.text;
  const decl = stmt.members.find(
    (m) => ts.isPropertyDeclaration(m) && ['ɵcmp', 'ɵdir'].includes(memberName(m)),
  );
  if (!decl || !decl.type || !ts.isTypeReferenceNode(decl.type)) continue;
  const [, selectorNode, , inputsNode, outputsNode] = decl.type.typeArguments ?? [];
  if (!selectorNode || !ts.isLiteralTypeNode(selectorNode)) continue;
  const selector = selectorNode.literal.text;

  const members = new Map();
  for (const m of stmt.members) if (memberName(m)) members.set(memberName(m), m);
  const props =
    propsInterfaces.get(`${className}Props`) ?? propsInterfaces.get(`${className.replace(/Component$/, '')}Props`);
  const defaults = bundleDefaults.get(className) ?? new Map();

  const inputs = [];
  if (inputsNode && ts.isTypeLiteralNode(inputsNode)) {
    for (const entry of inputsNode.members) {
      const prop = memberName(entry);
      const meta = {};
      for (const f of entry.type?.members ?? []) {
        const v = f.type;
        meta[memberName(f)] = ts.isLiteralTypeNode(v)
          ? v.literal.kind === ts.SyntaxKind.TrueKeyword
            ? true
            : v.literal.kind === ts.SyntaxKind.FalseKeyword
              ? false
              : v.literal.text
          : undefined;
      }
      const classMember = members.get(prop);
      const propsMember = props?.get(prop);
      const classDocs = classMember ? jsDoc(classMember) : {};
      const propsDocs = propsMember ? jsDoc(propsMember) : {};
      const docs = {
        description: propsDocs.description ?? classDocs.description,
        default: propsDocs.default ?? classDocs.default,
      };
      const bundleDefault = defaults.get(prop);
      const typeNode = propsMember?.type ?? unwrapSignalType(classMember?.type);
      const type = shortenType(typeNode);
      // Only worth listing when the type is an alias name that hides the values.
      const values = /^[A-Z]\w*$/.test(type) ? valuesFor(typeNode) : undefined;
      inputs.push({
        name: meta.alias ?? prop,
        type,
        ...(values ? { values } : {}),
        required: meta.required === true || bundleDefault === REQUIRED,
        default: bundleDefault && bundleDefault !== REQUIRED ? bundleDefault : docs.default,
        description: docs.description,
      });
    }
  }

  const outputs = [];
  if (outputsNode && ts.isTypeLiteralNode(outputsNode)) {
    for (const entry of outputsNode.members) {
      const prop = memberName(entry);
      const alias = entry.type && ts.isLiteralTypeNode(entry.type) ? entry.type.literal.text : prop;
      const classMember = members.get(prop);
      // A model() input's generated `xChange` output has no member of its own.
      const modelOf = !classMember && prop.endsWith('Change') ? members.get(prop.slice(0, -'Change'.length)) : undefined;
      const typeNode = unwrapSignalType((classMember ?? modelOf)?.type);
      outputs.push({
        name: alias,
        type: typeNode ? shortenType(typeNode) : 'void',
        description: classMember ? jsDoc(classMember).description : undefined,
      });
    }
  }

  reference[selector] = { className, inputs, outputs };
}

const banner =
  '// GENERATED FILE — do not edit by hand. Run `npm run generate:api` to regenerate.\n';
const contents = `${banner}
export interface ApiInput {
  name: string;
  type: string;
  /** Allowed values when \`type\` is an alias of a small literal union. */
  values?: string[];
  required: boolean;
  default?: string;
  description?: string;
}

export interface ApiOutput {
  name: string;
  type: string;
  description?: string;
}

export interface ApiEntry {
  className: string;
  inputs: ApiInput[];
  outputs: ApiOutput[];
}

export { UI_ANGULAR_VERSION } from '../../library-version.generated';

export const API_REFERENCE: Record<string, ApiEntry> = ${JSON.stringify(reference, null, 2)};
`;

writeFileSync(OUT_PATH, contents);
writeFileSync(
  VERSION_OUT_PATH,
  `${banner}
/** Installed version of @checkworkrights/ui-angular. */
export const UI_ANGULAR_VERSION = ${JSON.stringify(version)};
`,
);
console.log(
  `[generate-api-reference] wrote ${OUT_PATH} — ${Object.keys(reference).length} components from v${version}.`,
);
