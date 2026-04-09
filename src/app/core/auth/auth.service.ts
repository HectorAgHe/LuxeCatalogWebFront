import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse, AuthUser, LoginRequest } from '../models/auth.model';
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http   = inject(HttpClient);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'lux_token';
  private readonly USER_KEY  = 'lux_user';

  // Estado reactivo
  private _user = signal<AuthUser | null>(this.loadUserFromSession());

  // Expuestos al template
  currentUser = this._user.asReadonly();
  isLoggedIn  = computed(() => this._user() !== null);
  isAdmin     = computed(() => this._user()?.role === 'Admin');
  isClient    = computed(() => this._user()?.role === 'User');

  // ── Login ──────────────────────────────────────────────
  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/Auth/login`,
      credentials
    ).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  // ── Logout ─────────────────────────────────────────────
  logout() {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    this._user.set(null);
    this.router.navigate(['/']);
  }

  // ── Token ──────────────────────────────────────────────
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  // ── Privados ───────────────────────────────────────────
  private handleAuthSuccess(response: AuthResponse) {
    const { token, ...user } = response;

    sessionStorage.setItem(this.TOKEN_KEY, token);
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));

    this._user.set(user);

    // Redirige según rol
    if (user.role === 'Admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
    }
  }

  private loadUserFromSession(): AuthUser | null {
    try {
      const raw = sessionStorage.getItem(this.USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
