import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PageToc } from './page-toc';

@Component({
  imports: [PageToc],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div #scroller class="scroller" style="height: 200px; overflow-y: auto">
      <div #page>
        @if (optOut()) {
          <div data-page-toc="none"></div>
        }
        <h2>Overview</h2>
        <div style="height: 400px"></div>
        <h3>First example</h3>
        <div style="height: 400px"></div>
        <h3>First example</h3>
        <div class="playground__preview"><h2>Preview heading</h2></div>
        <cwr-title-block><h2>Library heading</h2></cwr-title-block>
        <h2 data-toc-label="v1.0.0">v1.0.0 <span>2026-01-01</span></h2>
        <h3 data-toc-ignore>Added</h3>
        <div style="height: 400px"></div>
      </div>
    </div>
    <app-page-toc [content]="page" [scrollContainer]="scroller" />
  `,
})
class Host {
  readonly optOut = signal(false);
}

describe('PageToc', () => {
  let fixture: ComponentFixture<Host>;
  let el: HTMLElement;

  const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

  async function settle(): Promise<void> {
    await fixture.whenStable();
    await nextFrame();
    await fixture.whenStable();
  }

  const tocLinks = () => Array.from(el.querySelectorAll<HTMLAnchorElement>('.page-toc__link'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Host],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Host);
    el = fixture.nativeElement as HTMLElement;
    await settle();
  });

  afterEach(() => fixture.destroy());

  it('should list the outline headings, skipping demo content and opted-out headings', () => {
    expect(tocLinks().map((a) => a.textContent?.trim())).toEqual([
      'Overview',
      'First example',
      'First example',
      'v1.0.0',
    ]);
  });

  it('should nest h3s that follow an h2', () => {
    expect(tocLinks().map((a) => a.classList.contains('page-toc__link--nested'))).toEqual([
      false,
      true,
      true,
      false,
    ]);
  });

  it('should give headings unique ids', () => {
    expect(tocLinks().map((a) => a.hash)).toEqual([
      '#overview',
      '#first-example',
      '#first-example-2',
      '#v1-0-0-2026-01-01',
    ]);
  });

  it('should add a copy-link anchor without changing the heading text', () => {
    const heading = el.querySelector('h2')!;
    const anchor = heading.querySelector('a.heading-anchor')!;
    expect(anchor.getAttribute('aria-label')).toBe('Copy link to Overview');
    expect(heading.textContent?.trim()).toBe('Overview');
  });

  it('should highlight the heading at the top of the scrolled area', async () => {
    expect(el.querySelector('.page-toc__link.is-active')?.textContent?.trim()).toBe('Overview');

    const scroller = el.querySelector<HTMLElement>('.scroller')!;
    const target = el.querySelector<HTMLElement>('#first-example')!;
    scroller.scrollTop = target.offsetTop - scroller.offsetTop;
    scroller.dispatchEvent(new Event('scroll'));
    await settle();

    expect(el.querySelector('.page-toc__link.is-active')?.getAttribute('href')).toContain(
      '#first-example',
    );
  });

  it('should render nothing on a page that opts out', async () => {
    fixture.componentInstance.optOut.set(true);
    await settle();
    expect(tocLinks().length).toBe(0);
  });
});
