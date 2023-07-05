import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/features/shopping-cart/services/shopping-cart.service';
import { ProductCart } from 'src/app/features/shopping-cart/shared/interfaces/product.interface';
import { ShoppingTypes } from 'src/app/features/shopping-cart/shared/interfaces/shopping-product.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  @Input() title: string = '';
  @Input() cartClickDisabled: boolean = false;
  @Input() hasBack: boolean = false;
  public cartCount: number = 0;
  private _shoppingCartService$: Subscription;

  constructor(
    private _shoppingCartService: ShoppingCartService,
    private _router: Router,
    private _navCtrl: NavController
  ) {
    this._shoppingCartService$ = this._shoppingCartService.productsData.subscribe({
      next: shoppingProduct => {
        if (shoppingProduct.type == ShoppingTypes.AddCart) {
          this.cartCount = shoppingProduct.productCart.reduce((acc: number, p: ProductCart) => {
            return acc + p.quantity;
          }, 0);
        }
      },
      error: error => {
        this.cartCount = 0;
        console.log(`empty products: ${error}`);
      }
    });
  }

  goToDetailCart(): void {
    if (this.cartClickDisabled) return;
    this._router.navigate(['shopping-cart/product-detail']);
  }

  back() {
    this._navCtrl.back();
  }

  ngOnDestroy(): void {
    this._shoppingCartService$.unsubscribe();
  }

}
