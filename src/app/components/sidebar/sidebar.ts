import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  BadgeComponent,
  IconButtonComponent,
  IconComponent,
  LogoComponent,
  NavbarNavItem,
} from '@checkworkrights/ui-angular';
import { GlobalSearchService } from '../global-search/global-search.service';

export interface SidebarNavGroup {
  id: string;
  label: string;
  items: NavbarNavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent, IconButtonComponent, BadgeComponent, LogoComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  @Input() topItems: NavbarNavItem[] = [];
  @Input() groups: SidebarNavGroup[] = [];
  @Input() isActiveRoute: (route: string) => boolean = () => false;
  @Input() isDarkMode = true;

  @Output() navItemClick = new EventEmitter<NavbarNavItem>();
  @Output() themeToggle = new EventEmitter<void>();

  private readonly globalSearchService = inject(GlobalSearchService);

  private readonly expandedGroupIds = new Set<string>();

  ngOnInit(): void {
    const activeGroup = this.groups.find((group) =>
      group.items.some((item) => this.isActiveRoute(item.route)),
    );
    if (activeGroup) {
      this.expandedGroupIds.add(activeGroup.id);
    }
  }

  trackByItem(_index: number, item: NavbarNavItem): string {
    return item.id ?? item.route;
  }

  trackByGroup(_index: number, group: SidebarNavGroup): string {
    return group.id;
  }

  hasActiveItem(group: SidebarNavGroup): boolean {
    return group.items.some((item) => this.isActiveRoute(item.route));
  }

  isExpanded(group: SidebarNavGroup): boolean {
    return this.expandedGroupIds.has(group.id);
  }

  toggleGroup(group: SidebarNavGroup): void {
    if (this.expandedGroupIds.has(group.id)) {
      this.expandedGroupIds.delete(group.id);
    } else {
      this.expandedGroupIds.add(group.id);
    }
  }

  onItemClick(item: NavbarNavItem): void {
    this.navItemClick.emit(item);
  }

  openGlobalSearch(): void {
    this.globalSearchService.openDialog();
  }
}
