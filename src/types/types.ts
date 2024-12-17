export interface CartProduct {
  cart_id: string;
  product_id: string;
  name: string;
  image: string;
  quantity: string;
  price: number;
  total: number;
  master_id?: string;
  model?: string;
  option?: Array<{ [key: string]: any }>;
  subscription?: Array<{ [key: string]: any }>;
  download?: Array<{ [key: string]: any }>;
  stock?: boolean;
  minimum?: boolean;
  shipping?: string;
  subtract?: string;
  reward?: number;
  tax_class_id?: string;
  category_name?: string;
  package_name?: string;
  package_price?: number;
}

export interface CategoryProducts {
  [key: string]: CartProduct[];
}

export interface PackageOrder {
  package: string;
  price: number;
  products: CategoryProducts;
  id?: string;
}

export interface MenuContent {
  name: string;
  ids: number[];
  count: number;
}

export type LoadingState = {
  [key: string]: boolean;
};

interface CartOrder {
  [key: string]: PackageOrder;
}
  