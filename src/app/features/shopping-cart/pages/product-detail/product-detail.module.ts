import { NgModule } from '@angular/core';
import { ProductDetailPageRoutingModule } from './product-detail-routing.module';

import { ProductDetailPage } from './product-detail.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    SharedModule,
    ScrollingModule,
    ProductDetailPageRoutingModule
  ],
  declarations: [ProductDetailPage]
})
export class ProductDetailPageModule {}
