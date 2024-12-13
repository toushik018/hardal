export interface IShippingMethodsModel {
  shipping_methods: ShippingMethods;
}

export interface ShippingMethods {
  flat: ShippingMethodsFlat;
}

export interface ShippingMethodsFlat {
  code: string;
  name: string;
  quote: Quote;
  sort_order: string;
  error: boolean;
}

export interface Quote {
  flat: QuoteFlat;
}

export interface QuoteFlat {
  code: string;
  name: string;
  cost: string;
  tax_class_id: string;
  text: string;
}
