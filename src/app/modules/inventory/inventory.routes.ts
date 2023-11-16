import { Routes } from "@angular/router";
import { MarcaPageComponent, MedidaPageComponent, ProductPageComponent, SubcategoryPageComponent } from "./pages";


export const routes:Routes = [
    {
        path: 'product',
        title: 'Producto',
        component: ProductPageComponent
    },
    {
        path: 'medida',
        title: 'Medida',
        component: MedidaPageComponent
    },
    {
        path: 'marca',
        title: 'Marca',
        component: MarcaPageComponent
    },
    {
        path: 'subcategory',
        title: 'Subcategoria',
        component: SubcategoryPageComponent
    },
    
]