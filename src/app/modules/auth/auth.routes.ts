import { CanActivateFn, Router, Routes } from "@angular/router";
import { LoginPageComponent } from "./pages"; 
import { inject } from "@angular/core";
import { AuthService } from "./services";

 const authGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const authSvc = inject(AuthService);
    try {
        const isLoggedIn = authSvc.isLoggedIn; 
        if (isLoggedIn) {
            router.navigate(['/', 'admin']);
            return false;
        }
        return true
    } catch (error) {
        console.log('Algo sucedio ?? 🔴', error);
        return true
    }
};

export const routes:Routes= [
    {
        path: 'login', 
        canActivate: [authGuard],
        component: LoginPageComponent
    },
    {
        path: '**',
        redirectTo: '/auth/login'
    }
];