import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  HttpClient,
} from '@angular/common/http';
import { Product } from '../shared/interfaces/product.interface';
import { ShoppingProduct, ShoppingTypes } from '../shared/interfaces/shopping-product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _urlProducts: string = `${environment.API_URL}products.json`;

  private _shoppingCart: ShoppingProduct = {
    type: ShoppingTypes.ListProduct,
    productList: [],
    productCart: []
  };
  private readonly _productsSubject$: BehaviorSubject<ShoppingProduct> = new BehaviorSubject<ShoppingProduct>(this._shoppingCart);

  constructor(private _http: HttpClient) { }

  get productsData(): Observable<ShoppingProduct> {
    return this._productsSubject$.asObservable();
  }

  setProductList(products: Product[]) {
    this._shoppingCart.type = ShoppingTypes.ListProduct;
    this._shoppingCart.productList = products;
    this._productsSubject$.next(this._shoppingCart);
  }

  addProductToCart(product: Product) {
    this._shoppingCart.type = ShoppingTypes.AddCart;
    const productCart = this._shoppingCart.productCart.find(p => p.id == product.id);
    if (!productCart) {
      this._shoppingCart.productCart.push({
        ...product,
        quantity: 1
      });
    } else {
      productCart.quantity++;
    }

    this._productsSubject$.next(this._shoppingCart);
  }

  removeProductToCart(product: Product) {
    const productCart = this._shoppingCart.productCart.find(p => p.id == product.id);
    if (!productCart) return;

    productCart.quantity--;
    this._shoppingCart.productCart = this._shoppingCart.productCart.filter(p => p.quantity > 0);

    this._productsSubject$.next(this._shoppingCart);
  }


  fetchProducts() {
    this._http.get(this._urlProducts).pipe(
      map((response: any) => { return response.products; })
    )
      .subscribe(
        (products: Product[]) => { this.setProductList(products); },
        (error) => {
          console.log("Error: ", error);
          this.setProductList([]);
        }
      );
  }
}
