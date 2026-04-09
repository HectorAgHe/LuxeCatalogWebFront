import { Component, inject, computed, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  private authService = inject(AuthService);

  // Input/Output para comunicación con admin-layout
  mobileOpen = input<boolean>(false);
  closeMenu  = output<void>();

  closeMobile() { this.closeMenu.emit(); }

  logout() { this.authService.logout(); }

  user = this.authService.currentUser;

  userName = computed(() => {
    const u = this.user();
    return u ? `${u.firstName} ${u.lastName}` : '';
  });

  userInitials = computed(() => {
    const u = this.user();
    if (!u) return 'A';
    return `${u.firstName.charAt(0)}${u.lastName.charAt(0)}`.toUpperCase();
  });

  navLinks = [
  { label: 'Catálogos', path: '/admin/catalogos' },
  { label: 'Marcas',    path: '/admin/marcas'     },
  { label: 'Temporada', path: '/admin/temporadas' },
  { label: 'Media',     path: '/admin/media'      },
  { label: 'Pedidos',   path: '/admin/pedidos'    },
  { label: 'Usuarios',  path: '/admin/usuarios'   },
];
}