import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { API_REFERENCE } from '../../pages/showcase/api-reference.generated';
import { ALL_SHOWCASE_PAGES } from '../../showcase-pages';
import { PageFooter } from './page-footer';

describe('PageFooter', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFooter],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();
  });

  async function render(path: string): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(PageFooter);
    fixture.componentRef.setInput('path', path);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('should link to the neighbouring pages in sidebar order', async () => {
    const index = ALL_SHOWCASE_PAGES.findIndex((page) => page.route === 'showcase/button');
    const el = await render('/showcase/button');
    const labels = Array.from(el.querySelectorAll('.pager-link__label')).map((a) =>
      a.textContent?.trim(),
    );
    expect(labels).toEqual([
      ALL_SHOWCASE_PAGES[index - 1].label,
      ALL_SHOWCASE_PAGES[index + 1].label,
    ]);
  });

  it('should omit "Previous" on the first page', async () => {
    const el = await render(`/${ALL_SHOWCASE_PAGES[0].route}`);
    expect(el.querySelectorAll('.pager-link').length).toBe(1);
    expect(el.querySelector('.pager-link--next')).not.toBeNull();
  });

  it('should link to the edit page and the library source folder', async () => {
    const el = await render('/showcase/menu-button');
    const hrefs = Array.from(el.querySelectorAll('.page-footer__links a')).map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs[0]).toMatch(/\/edit\/main\/src\/app\/pages\/showcase\/menu-button\.showcase\.ts$/);
    expect(hrefs[1]).toMatch(/\/packages\/ui\/angular\/src\/lib\/menu$/);
  });

  it('should render nothing for a path that is not a page', async () => {
    const el = await render('/not-a-page');
    expect(el.querySelector('.page-footer')).toBeNull();
  });
});

describe('Showcase page selectors', () => {
  it('should all exist in the generated API reference', () => {
    const selectors = ALL_SHOWCASE_PAGES.flatMap((page) => page.selectors ?? []);
    expect(selectors.filter((selector) => !API_REFERENCE[selector])).toEqual([]);
  });
});
