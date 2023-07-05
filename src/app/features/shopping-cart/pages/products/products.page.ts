import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';
import { ShoppingTypes } from '../../shared/interfaces/shopping-product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {
  public products: Product[] = [];
  private _shoppingCartService$: Subscription;

  constructor(private _shoppingCartService: ShoppingCartService) {

    this._shoppingCartService$ = this._shoppingCartService.productsData.subscribe({
      next: shoppingProduct => {
        if (shoppingProduct.type == ShoppingTypes.ListProduct) {
          this.products = shoppingProduct.productList;
        }
      },
      error: error => {
        this.products = [];
        console.log(`empty products: ${error}`);
      }
    })
  }

  ngOnInit() {
    this._shoppingCartService.fetchProducts();
  }

  addToCart(product: Product) {
    this._shoppingCartService.addProductToCart(product);
  }

  ngOnDestroy(): void {
    this._shoppingCartService$.unsubscribe();
  }



}
