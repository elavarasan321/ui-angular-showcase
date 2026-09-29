import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { SHOWCASE_PAGE_GROUPS, toNavGroups } from '../../showcase-pages';
import { GlobalSearchService } from '../global-search/global-search.service';
import { MobileNav } from './mobile-nav';

@Component({ template: '' })
class BlankPage {}

describe('MobileNav', () => {
  let fixture: ComponentFixture<MobileNav>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNav],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([{ path: '**', component: BlankPage }]),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MobileNav);
    fixture.componentRef.setInput('groups', toNavGroups(SHOWCASE_PAGE_GROUPS));
    el = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  afterEach(() => fixture.destroy());

  /** The top bar's icon buttons, in order: menu, search, theme. */
  const topBarButton = (index: number) =>
    el.querySelectorAll<HTMLButtonElement>('.mobile-nav cwr-icon-button button')[index];

  async function openDrawer(): Promise<void> {
    topBarButton(0).click();
    await fixture.whenStable();
  }

  it('should open the navigation drawer from the menu button', async () => {
    expect(el.querySelector('cwr-drawer')).toBeNull();
    await openDrawer();
    expect(el.querySelector('cwr-drawer app-sidebar.sidebar--drawer')).not.toBeNull();
  });

  it('should close the drawer after navigating', async () => {
    await openDrawer();
    await TestBed.inject(Router).navigateByUrl('/showcase/button');
    await fixture.whenStable();
    expect(el.querySelector('cwr-drawer')).toBeNull();
  });

  it('should open global search', async () => {
    topBarButton(1).click();
    expect(TestBed.inject(GlobalSearchService).open()).toBeTrue();
  });

  it('should ask the app to toggle the theme', () => {
    let toggled = false;
    fixture.componentInstance.themeToggle.subscribe(() => (toggled = true));
    topBarButton(2).click();
    expect(toggled).toBeTrue();
  });
});
