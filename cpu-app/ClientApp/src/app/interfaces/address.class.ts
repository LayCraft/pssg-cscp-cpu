import { iAddress } from "./address.interface";

export class Address implements iAddress {
  line1: string;
  line2: string;
  city: string;
  postalCode: string;
  province: string;
  // country: string;
  constructor(address?: iAddress) {
    this.line1 = address.line1;
    this.line2 = address.line2;
    this.postalCode = address.postalCode;
    this.city = address.city;
    this.province = address.province;
  }
  toDynamics(): object {
    return {}
  }
  fromDynamics(dynamicsObject) {
  }
}
