import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@modules/auth/services';


export const sessionGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authSvc = inject(AuthService);
  try {
    const isLoggedIn = authSvc.isLoggedIn;
    console.log(isLoggedIn)
    if (!isLoggedIn) {
      router.navigate(['/', 'auth'])
    }
    return isLoggedIn
  } catch (error) {
    console.log('Algo sucedio ?? 🔴', error);
    return false
  }
};
