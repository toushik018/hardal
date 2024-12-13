import { ECustomerType } from "../Enums";

export interface IAddressModel {
  customerType: ECustomerType;
  titel: ECustomerType;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address_1: string;
  city: string;
  country_id: string;
  zone_id: string;
  shipping_address_id: string;
  payment_address_id?: string;
}
