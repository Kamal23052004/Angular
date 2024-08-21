import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { LandingComponent } from './pages/website/landing/landing.component';
import { CategoryProductsComponent } from './pages/website/category-products/category-products.component';

export const routes: Routes = [

    {
        path:'',
        redirectTo:'shop',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'shop',
        component:LandingComponent
    },
    {
        path:'products/:id',
        component: CategoryProductsComponent
    },
    {
        path:'',
        component: LayoutComponent,
        children: [
            {
                path: 'products',
                component: ProductsComponent
            },
            {
                path: 'category',
                component: CategoriesComponent
            }
            
        ]
    }
];
