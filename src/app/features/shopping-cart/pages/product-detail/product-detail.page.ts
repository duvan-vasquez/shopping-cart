import { Component, OnDestroy } from '@angular/core';
import { ProductCart } from '../../shared/interfaces/product.interface';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnDestroy {
  public productsCart: ProductCart[] = [];
  private _shoppingCartService$: Subscription;

  constructor(
    private _shoppingCartService: ShoppingCartService,
    private _navCtrl: NavController
  ) {
    this._shoppingCartService$ = this._shoppingCartService.productsData.subscribe({
      next: shoppingProduct => {
        this.productsCart = shoppingProduct.productCart;
      },
      error: error => {
        this.productsCart = [];
        console.log(`empty products cart: ${error}`);
      }
    })
  }

  get totalAmount() {
    return this.productsCart.reduce((acc, p: ProductCart) => {
      return acc + (p.quantity * p.price);
    }, 0);
  }

  removeCart(product: ProductCart) {
    this._shoppingCartService.removeProductToCart(product);
  }

  goToProducts() {
    this._navCtrl.back();
  }

  ngOnDestroy(): void {
    this._shoppingCartService$.unsubscribe();
  }

}
