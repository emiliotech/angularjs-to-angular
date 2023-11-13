import { Routes } from "@angular/router";
import { DashboardComponent, LayoutComponent } from "./components";

export const routes:Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                title: 'App - Dashboard',
                component: DashboardComponent
            },
            {
                path: 'inventory',
                title: 'App - Inventory',
                loadChildren:()=>import('./../inventory/inventory.routes').then(r=>r.routes)
            }
        ]
    }
]