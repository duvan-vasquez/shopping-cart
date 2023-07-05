import { Product } from "src/app/features/shopping-cart/shared/interfaces/product.interface";

export interface ResponseProducts {
    limit: number;
    products: Product[];
    skip: number;
    total: number;
}