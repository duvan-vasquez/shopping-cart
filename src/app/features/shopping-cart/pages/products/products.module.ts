import { NgModule } from '@angular/core';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    SharedModule,
    ScrollingModule,
    ProductsPageRoutingModule
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule { }
