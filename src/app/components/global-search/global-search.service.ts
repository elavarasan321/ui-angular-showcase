import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalSearchService {
  readonly open = signal(false);

  openDialog(): void {
    this.open.set(true);
  }

  close(): void {
    this.open.set(false);
  }
}
