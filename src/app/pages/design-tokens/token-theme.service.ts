import { Injectable, OnDestroy, signal } from '@angular/core';

@Injectable()
export class TokenThemeService implements OnDestroy {
  private observer: MutationObserver;

  /** Bumped on every data-theme change; read (and ignore the value) inside a
   *  computed() to force it to re-evaluate when the active theme flips. */
  readonly version = signal(0);

  constructor() {
    this.observer = new MutationObserver(() => this.version.update((v) => v + 1));
    this.observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
