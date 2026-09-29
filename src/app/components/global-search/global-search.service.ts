import { Injectable, signal } from '@angular/core';

const isApplePlatform = (): boolean => {
  const platform =
    (navigator as Navigator & { userAgentData?: { platform: string } }).userAgentData?.platform ??
    navigator.platform ??
    '';
  return /mac|iphone|ipad|ipod/i.test(platform);
};

@Injectable({ providedIn: 'root' })
export class GlobalSearchService {
  readonly open = signal(false);

  /** The keyboard shortcut that opens search, as this platform writes it. */
  readonly shortcutLabel = isApplePlatform() ? '⌘K' : 'Ctrl K';

  openDialog(): void {
    this.open.set(true);
  }

  close(): void {
    this.open.set(false);
  }
}
