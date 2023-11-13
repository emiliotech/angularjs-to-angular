import { Routes } from "@angular/router";
import { LoginPageComponent } from "./pages";

export const routes:Routes= [
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: '**',
        redirectTo: '/auth/login'
    }
];