import type { HLJSApi, Language, LanguageFn, Mode } from 'highlight.js';

const BINDING: Mode = {
  className: 'attr',
  begin: /\[\(?[\w.@-]+\)?\]|\([\w.@-]+\)|[#*][\w.-]+/,
};

const INTERPOLATION: Mode = {
  className: 'template-variable',
  begin: /\{\{/,
  end: /\}\}/,
};

const CONTROL_FLOW: Mode = {
  className: 'keyword',
  begin:
    /@(?:if|else if|else|for|switch|case|default|defer|placeholder|loading|error|empty|let)\b/,
};

// xml() builds fresh mode objects per call, so mutating them in place is safe.
function addBindingToAttributeModes(mode: Mode, seen = new Set<Mode>()): void {
  if (seen.has(mode)) return;
  seen.add(mode);
  const children = (mode.contains ?? []).filter(
    (c): c is Mode => typeof c === 'object',
  );
  if (children.some((c) => c.className === 'attr')) {
    mode.contains = [BINDING, ...(mode.contains ?? [])];
  }
  children.forEach((c) => addBindingToAttributeModes(c, seen));
  if (mode.starts) addBindingToAttributeModes(mode.starts, seen);
}

export function angularHtml(xml: LanguageFn): LanguageFn {
  return (hljs: HLJSApi): Language => {
    const base = xml(hljs);
    addBindingToAttributeModes(base);
    return {
      ...base,
      name: 'Angular HTML',
      aliases: [],
      contains: [INTERPOLATION, CONTROL_FLOW, ...(base.contains ?? [])],
    };
  };
}
