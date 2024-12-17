import { IAddressModel } from "./IAddress.model";

export interface IAddressSliceRedux {
  isSameAddress: boolean;
  shippingAddress: IAddressModel;
  paymentAddress?: IAddressModel;
}
