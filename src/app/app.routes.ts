import { Routes } from '@angular/router'; 
import { sessionGuard } from '@core/guards';
export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: "auth",
        loadChildren: () => import(`./modules/auth/auth.routes`).then(m => m.routes)
    },
    {
        path: 'admin',        
        canActivate: [sessionGuard],
        loadChildren: () => import(`./modules/admin/admin.routes`).then(m => m.routes),
    }
];