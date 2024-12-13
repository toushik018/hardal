export interface IShoppingCartProduct {
  cart_id: string;
  product_id: string;
  name: string;
  model: string;
  option: unknown[];
  subscription: string;
  quantity: string;
  stock: boolean;
  minimum: boolean;
  reward: number;
  price: string;
  total: string;
}
