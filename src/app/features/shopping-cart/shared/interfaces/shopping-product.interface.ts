import { Product, ProductCart } from "./product.interface";

export enum ShoppingTypes {
    ListProduct,
    AddCart,
    RemoveCart
}

export interface ShoppingProduct {
    type: ShoppingTypes;
    productList: Product[];
    productCart: ProductCart[]
}