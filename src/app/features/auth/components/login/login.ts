import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private fb          = inject(FormBuilder);
  private authService = inject(AuthService);

  loading     = signal(false);
  errorMsg    = signal('');
  showPassword = signal(false);

  loginForm: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMsg.set('');

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading.set(false);
        // La redirección la maneja el AuthService
      },
      error: (err) => {
        this.loading.set(false);
        if (err.status === 401) {
          this.errorMsg.set('Correo o contraseña incorrectos.');
        } else if (err.status === 0) {
          this.errorMsg.set('No se pudo conectar con el servidor.');
        } else {
          this.errorMsg.set('Ocurrió un error. Intenta de nuevo.');
        }
      }
    });
  }
}