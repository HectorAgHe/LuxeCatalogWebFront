import { Component, signal } from '@angular/core';
import { Sidebar } from "./components/sidebar/sidebar";
import { Topbar } from "./components/topbar/topbar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [Sidebar, Topbar, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  sidebarOpen = signal(false);

  openSidebar() {this.sidebarOpen.set(true)};
  closeSidebar() {this.sidebarOpen.set(false)};
}
