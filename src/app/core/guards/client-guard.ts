import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const clientGuard: CanActivateFn = () => {

  const auth    = inject(AuthService);  
  const router  = inject(Router);

  if(auth.isClient() || auth.isAdmin()) return true;

  router.navigate(['/auth/login']);
  return false;
};
