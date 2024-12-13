/* eslint-disable @typescript-eslint/no-unused-vars */
import { IShoppingCartProduct } from "./IShoppingCartProduct.model";
import { ITotal } from "./ITotal.model";

interface IMenuContent {
  name: string;
  ids: number[];
  count: number;
  currentCount?: number;
}

interface IMenu {
  name?: string;
  id?: number;
  price?: number;
  contents: IMenuContent[];
}

interface ICategory {
  id: string;
  title: string;
}

interface ICart {
  menu: IMenu;
  category: ICategory;
  order: any[]; // You can type this more specifically if needed
}

export interface IShoppingCardModel {
  products: IShoppingCartProduct[];
  cart: {
    menu?: {
      name?: string;
      id?: number;
      price?: number;
      contents: Array<{
        name: string;
        ids: number[];
        count: number;
        currentCount?: number;
      }>;
    };
    category?: {
      id: string;
      title: string;
    };
    order: any[];
  };
  vouchers: any[];
  totals: any[];
  shipping_required: boolean;
}