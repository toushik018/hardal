export interface IPaymentMethodsModel {
  payment_methods: PaymentMethods;
}

export interface PaymentMethods {
  cod: PaymentMethodsCod;
}

export interface PaymentMethodsCod {
  code: string;
  name: string;
  option: Option;
  sort_order: string;
}

export interface Option {
  cod: OptionCod;
}

export interface OptionCod {
  code: string;
  name: string;
}
