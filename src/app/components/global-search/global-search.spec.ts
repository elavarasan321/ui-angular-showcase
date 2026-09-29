import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { SHOWCASE_PAGE_GROUPS, toNavGroups } from '../../showcase-pages';
import { GlobalSearch, splitOnMatches } from './global-search';
import { GlobalSearchService } from './global-search.service';

@Component({ template: '' })
class BlankPage {}

describe('GlobalSearch', () => {
  let fixture: ComponentFixture<GlobalSearch>;

  beforeEach(async () => {
    localStorage.removeItem('cwr-showcase-recent-pages');
    await TestBed.configureTestingModule({
      imports: [GlobalSearch],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([{ path: '**', component: BlankPage }]),
      ],
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

  afterEach(() => {
    fixture.destroy();
    localStorage.removeItem('cwr-showcase-recent-pages');
  });

  it('should list recent pages, newest first and without the current one, before typing', async () => {
    const router = TestBed.inject(Router);
    for (const url of ['/showcase/button', '/showcase/badge', '/getting-started']) {
      await router.navigateByUrl(url);
    }
    await fixture.whenStable();

    const firstGroup = document.querySelector('.global-search-group')!;
    expect(firstGroup.querySelector('.global-search-group-label')?.textContent?.trim()).toBe(
      'Recent',
    );
    const labels = Array.from(firstGroup.querySelectorAll('.global-search-result-label')).map(
      (el) => el.textContent?.trim(),
    );
    expect(labels).toEqual(['Badge', 'Button']);
  });

  it('should keep recent pages across visits', async () => {
    await TestBed.inject(Router).navigateByUrl('/showcase/button');
    expect(JSON.parse(localStorage.getItem('cwr-showcase-recent-pages')!)).toEqual([
      'showcase/button',
    ]);
  });

  it('should highlight the matched part of a result', async () => {
    await search('card');
    const matches = Array.from(document.querySelectorAll('.global-search-match')).map((el) =>
      el.textContent?.trim(),
    );
    expect(matches).toContain('Card');
  });

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

describe('splitOnMatches', () => {
  it('should split around every case-insensitive match', () => {
    expect(splitOnMatches('Toggle card, Checkbox Card', 'CARD')).toEqual([
      { text: 'Toggle ', match: false },
      { text: 'card', match: true },
      { text: ', Checkbox ', match: false },
      { text: 'Card', match: true },
    ]);
  });

  it('should return the whole text when the term is blank', () => {
    expect(splitOnMatches('Button', '  ')).toEqual([{ text: 'Button', match: false }]);
  });
});
