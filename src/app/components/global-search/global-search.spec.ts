import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SHOWCASE_PAGE_GROUPS, toNavGroups } from '../../showcase-pages';
import { GlobalSearch } from './global-search';
import { GlobalSearchService } from './global-search.service';

describe('GlobalSearch', () => {
  let fixture: ComponentFixture<GlobalSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSearch],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(GlobalSearch);
    fixture.componentRef.setInput('groups', toNavGroups(SHOWCASE_PAGE_GROUPS));
    TestBed.inject(GlobalSearchService).openDialog();
    await fixture.whenStable();
  });

  /** Types a term and returns the visible results as "label | detail". */
  async function search(term: string): Promise<string[]> {
    // onSearchTermChange is what the search input's valueChange calls.
    (
      fixture.componentInstance as unknown as { onSearchTermChange(v: string): void }
    ).onSearchTermChange(term);
    // Let the lazily imported API/token data arrive.
    await new Promise((resolve) => setTimeout(resolve, 50));
    await fixture.whenStable();
    return Array.from(document.querySelectorAll('.global-search-result')).map((el) =>
      [
        el.querySelector('.global-search-result-label')?.textContent?.trim(),
        el.querySelector('.global-search-result-detail')?.textContent?.trim(),
      ]
        .filter(Boolean)
        .join(' | '),
    );
  }

  afterEach(() => fixture.destroy());

  it('should match pages by label', async () => {
    expect(await search('toggle card')).toContain('Toggle Card');
  });

  it('should match pages by selector', async () => {
    expect(await search('cwr-menu-button')).toContain('Menu Button | cwr-menu-button');
  });

  it('should match component inputs', async () => {
    expect(await search('leadingicon')).toContain('leadingIcon | input of cwr-button');
  });

  it('should match design tokens', async () => {
    const results = await search('--color-bg-brand');
    expect(results.some((r) => r.startsWith('--color-bg-brand'))).toBeTrue();
  });
});
