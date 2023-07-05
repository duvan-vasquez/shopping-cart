import { NgModule } from '@angular/core';

import { ShoppingCartPageRoutingModule } from './shopping-cart-routing.module';

import { ShoppingCartPage } from './shopping-cart.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ShoppingCartPageRoutingModule
  ],
  declarations: [ShoppingCartPage]
})
export class ShoppingCartPageModule {}
