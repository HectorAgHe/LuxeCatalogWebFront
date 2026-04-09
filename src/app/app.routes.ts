import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';
import { clientGuard } from './core/guards/client-guard';

export const routes: Routes = [

  // Rutas públicas
  {
    path: '',
    loadComponent: () => import('./layouts/public-layout/public-layout')
      .then(m => m.PublicLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/public/home/home')
          .then(m => m.Home)
      }
    ]
  },

  // Login
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/components/login/login')
      .then(m => m.Login)
  },

  // Admin
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./layouts/admin-layout/admin-layout')
      .then(m => m.AdminLayout),
    children: [
      // TODO: agregar cuando se creen los componentes
       {
      path: 'catalogos',
      loadComponent: () => import('./features/admin/catalogs/components/catalog-list/catalog-list')
        .then(m => m.CatalogList)
    },
    {
   path: 'marcas',
   loadComponent: () => import('./features/admin/brands/components/brand-list/brand-list')
   .then(m => m.BrandList)
    },
    {
      path: '',
      redirectTo: 'catalogos',
      pathMatch: 'full'
    }
    ]
  },

  // Dashboard
  {
    path: 'dashboard',
    canActivate: [authGuard, clientGuard],
    loadComponent: () => import('./layouts/client-layout/client-layout')
      .then(m => m.ClientLayout),
    children: [
      // TODO: agregar cuando se creen los componentes
      { path: '', redirectTo: 'catalogos', pathMatch: 'full' }

    ]
  },
 

  { path: '**', redirectTo: '' }
];