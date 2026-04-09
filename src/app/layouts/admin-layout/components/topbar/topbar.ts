import { Component, inject, computed, output } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/auth/auth.service';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/admin/catalogos':  { title: 'Catalog Manager',  subtitle: 'Administra los catálogos PDF y sus portadas.' },
  '/admin/marcas':     { title: 'Marcas',            subtitle: 'Gestiona las marcas del catálogo.' },
  '/admin/temporadas': { title: 'Season Controller', subtitle: 'Cambia la temporada activa y agrega nuevas.' },
  '/admin/media':      { title: 'Media Manager',     subtitle: 'Administra imágenes, videos y banners.' },
  '/admin/pedidos':    { title: 'Pedidos',            subtitle: 'Gestiona los pedidos de tus clientes.' },
  '/admin/usuarios':   { title: 'Usuarios',           subtitle: 'Administra los usuarios del sistema.' },
};

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css'
})
export class Topbar {

  private authService = inject(AuthService);
  private router      = inject(Router);

  // Output hacia admin-layout
  openMenu = output<void>();

  user = this.authService.currentUser;

  firstName = computed(() => this.user()?.firstName ?? '');

  userInitials = computed(() => {
    const u = this.user();
    if (!u) return 'A';
    return `${u.firstName.charAt(0)}${u.lastName.charAt(0)}`.toUpperCase();
  });

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  pageTitle    = computed(() => PAGE_TITLES[this.currentUrl()]?.title    ?? 'Panel Admin');
  pageSubtitle = computed(() => PAGE_TITLES[this.currentUrl()]?.subtitle ?? '');

  openSidebar() { this.openMenu.emit(); }
}