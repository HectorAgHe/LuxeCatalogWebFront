import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
   imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  private authService = inject(AuthService);

  menuOpen = signal(false);
  scrolled = signal(false);

  isAdmin  = this.authService.isAdmin;
  isClient = this.authService.isClient;
  user     = this.authService.currentUser;

  navLinks = [
    { label: 'Catálogos', path: '/catalogos' },
    { label: 'Marcas', path: '/marcas' },
    { label: 'Contacto', path: '/contacto' },
    { label: 'Nosotros', path: '/nosotros' },
  ];

  logout() {
    this.authService.logout();
    this.closeMenu();
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu() { this.menuOpen.set(false); }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 20); }
}

