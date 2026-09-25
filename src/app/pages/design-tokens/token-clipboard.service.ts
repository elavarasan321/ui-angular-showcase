import { Injectable, signal } from '@angular/core';

@Injectable()
export class TokenClipboardService {
  readonly copied = signal<string | null>(null);
  private timeout?: ReturnType<typeof setTimeout>;

  copy(cssVar: string): void {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(`var(${cssVar})`);
    this.copied.set(cssVar);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.copied.set(null), 1400);
  }
}
