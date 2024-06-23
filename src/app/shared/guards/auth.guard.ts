import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  const isAuthenticated = authService.getLoggedUserInfo();
  
  if (isAuthenticated.token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
