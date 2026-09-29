import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { SHOWCASE_PAGE_GROUPS } from './showcase-pages';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection(), provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should list every showcase page in the sidebar', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const groupLabels = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.sidebar-group-label'),
    ).map((el) => el.textContent?.trim());
    expect(groupLabels).toEqual(SHOWCASE_PAGE_GROUPS.map((group) => group.label));
  });
});

describe('SHOWCASE_PAGE_GROUPS', () => {
  const pages = SHOWCASE_PAGE_GROUPS.flatMap((group) => group.pages);

  it('should have unique ids and routes', () => {
    expect(new Set(pages.map((page) => page.id)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.route)).size).toBe(pages.length);
  });

  it('should register a route for every page, with the wildcard last', () => {
    const paths = routes.map((route) => route.path);
    for (const page of pages) {
      expect(paths).toContain(page.route);
    }
    expect(paths[paths.length - 1]).toBe('**');
  });
});
