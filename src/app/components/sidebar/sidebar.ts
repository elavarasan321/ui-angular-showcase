import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  BadgeComponent,
  IconComponent,
  LogoComponent,
  NavbarNavItem,
  SearchInputComponent,
} from '@checkworkrights/ui-angular';

export interface SidebarNavGroup {
  id: string;
  label: string;
  items: NavbarNavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    IconComponent,
    BadgeComponent,
    LogoComponent,
    SearchInputComponent,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  @Input() topItems: NavbarNavItem[] = [];
  @Input() groups: SidebarNavGroup[] = [];
  @Input() isActiveRoute: (route: string) => boolean = () => false;

  @Output() navItemClick = new EventEmitter<NavbarNavItem>();

  searchTerm = '';

  private readonly expandedGroupIds = new Set<string>();

  ngOnInit(): void {
    const activeGroup = this.groups.find((group) =>
      group.items.some((item) => this.isActiveRoute(item.route)),
    );
    if (activeGroup) {
      this.expandedGroupIds.add(activeGroup.id);
    }
  }

  get isSearching(): boolean {
    return this.searchTerm.trim().length > 0;
  }

  trackByItem(_index: number, item: NavbarNavItem): string {
    return item.id ?? item.route;
  }

  trackByGroup(_index: number, group: SidebarNavGroup): string {
    return group.id;
  }

  filteredTopItems(): NavbarNavItem[] {
    return this.filterItems(this.topItems);
  }

  filteredItems(group: SidebarNavGroup): NavbarNavItem[] {
    return this.filterItems(group.items);
  }

  isGroupVisible(group: SidebarNavGroup): boolean {
    return !this.isSearching || this.filteredItems(group).length > 0;
  }

  hasActiveItem(group: SidebarNavGroup): boolean {
    return group.items.some((item) => this.isActiveRoute(item.route));
  }

  isExpanded(group: SidebarNavGroup): boolean {
    if (this.isSearching) {
      return this.filteredItems(group).length > 0;
    }
    return this.expandedGroupIds.has(group.id);
  }

  toggleGroup(group: SidebarNavGroup): void {
    if (this.isSearching) {
      return;
    }
    if (this.expandedGroupIds.has(group.id)) {
      this.expandedGroupIds.delete(group.id);
    } else {
      this.expandedGroupIds.add(group.id);
    }
  }

  onItemClick(item: NavbarNavItem): void {
    this.navItemClick.emit(item);
  }

  onSearchTermChange(value: string): void {
    this.searchTerm = value;
  }

  private filterItems(items: NavbarNavItem[]): NavbarNavItem[] {
    if (!this.isSearching) {
      return items;
    }
    const term = this.searchTerm.trim().toLowerCase();
    return items.filter((item) => item.label.toLowerCase().includes(term));
  }
}
