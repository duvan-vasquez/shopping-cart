import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shopping-cart',
    pathMatch: 'full'
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./features/shopping-cart/shopping-cart.module').then( m => m.ShoppingCartPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
