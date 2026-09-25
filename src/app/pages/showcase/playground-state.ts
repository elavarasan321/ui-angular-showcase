import {
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  isSignal,
  untracked,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

type Primitive = string | number | boolean | null;

/**
 * Signals that hold transient runtime state (an open overlay, focus, the last event fired)
 * rather than a configuration someone would want to share, so they're never put in the URL.
 */
const TRANSIENT_KEYS = new Set([
  'open',
  'hasFocus',
  'lastEvent',
  'lastSelected',
  'searchTerm',
  'searchValue',
  'submitting',
]);

/** Query param the playground shell uses for its preview theme; never a control's key. */
export const PREVIEW_THEME_PARAM = 'previewTheme';

export interface PlaygroundState {
  /** True when any control differs from its initial value. */
  readonly dirty: Signal<boolean>;
  /** Puts every control back to its initial value (and clears it from the URL). */
  reset(): void;
}

interface Entry {
  key: string;
  signal: WritableSignal<Primitive>;
  initial: Primitive;
}

function isPrimitive(v: unknown): v is Primitive {
  return v === null || ['string', 'number', 'boolean'].includes(typeof v);
}

function parseParam(raw: string, initial: Primitive): Primitive | undefined {
  switch (typeof initial) {
    case 'boolean':
      return raw === 'true' ? true : raw === 'false' ? false : undefined;
    case 'number': {
      const n = Number(raw);
      return raw !== '' && Number.isFinite(n) ? n : undefined;
    }
    case 'string':
      return raw;
    default:
      // Nullable control (e.g. `signal<number | null>(null)`): the type isn't known up front,
      // so an empty param means null and a numeric one is read back as a number.
      if (raw === '') return null;
      return /^-?\d+(\.\d+)?$/.test(raw) ? Number(raw) : raw;
  }
}

/**
 * Two-way syncs a playground's controls with the page's query params, so a link reproduces the
 * exact setup (`/showcase/button?variant=outline&size=sm`). Only values that differ from their
 * initial value are written, and history isn't polluted (`replaceUrl`).
 *
 * Every writable signal on `host` holding a primitive is treated as a control, so call this as
 * the host's **last** field initializer — fields declared after it won't be picked up.
 */
export function playgroundState(host: object, exclude: readonly string[] = []): PlaygroundState {
  const router = inject(Router);
  const route = inject(ActivatedRoute);

  const entries: Entry[] = Object.entries(host)
    .filter(
      ([key, value]) =>
        isSignal(value) &&
        typeof (value as WritableSignal<unknown>).set === 'function' &&
        !TRANSIENT_KEYS.has(key) &&
        !exclude.includes(key) &&
        key !== PREVIEW_THEME_PARAM,
    )
    .map(([key, value]) => ({ key, signal: value as WritableSignal<Primitive>, initial: (value as Signal<unknown>)() }))
    .filter((e): e is Entry => isPrimitive(e.initial));

  const params = route.snapshot.queryParamMap;
  for (const e of entries) {
    const raw = params.get(e.key);
    if (raw === null) continue;
    const parsed = parseParam(raw, e.initial);
    if (parsed !== undefined) e.signal.set(parsed);
  }

  effect(() => {
    const queryParams: Params = {};
    for (const e of entries) {
      const v = e.signal();
      // Non-primitive values (e.g. a Date picked in a nullable control) can't round-trip.
      queryParams[e.key] = v === e.initial || !isPrimitive(v) ? null : String(v ?? '');
    }
    untracked(() => {
      const current = route.snapshot.queryParamMap;
      const changed = Object.entries(queryParams).some(([k, v]) => current.get(k) !== v);
      if (!changed) return;
      router.navigate([], {
        relativeTo: route,
        queryParams,
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  });

  return {
    dirty: computed(() => entries.some((e) => e.signal() !== e.initial)),
    reset: () => entries.forEach((e) => e.signal.set(e.initial)),
  };
}
