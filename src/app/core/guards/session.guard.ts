import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const sessionGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  // const authSvc = inject(AuthService);
  // if (authSvc.isLoggedIn !== true) {
  //   router.navigate(['/', 'auth'])
  // }
  //router.navigate(['/', 'auth'])
  return true;
};
