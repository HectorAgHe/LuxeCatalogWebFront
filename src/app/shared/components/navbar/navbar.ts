import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
   imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  menuOpen = signal(false);
  scrolled = signal(false);

  // TODO: reemplazar con AuthService cuando este JWT listo
  isLoggedIn = signal(false);
  isAdmin = signal(false);
  isClient = signal(false);

  navLinks = [
    { label: 'Catálogos', path: '/catalogos' },
    { label: 'Marcas', path: '/marcas' },
    { label: 'Contacto', path: '/contacto' },
    { label: 'Nosotros', path: '/nosotros' },
  ];

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu() { this.menuOpen.set(false); }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 20); }
}

