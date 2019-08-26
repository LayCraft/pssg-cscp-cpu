import { iAddress } from "./address.interface";

export class Address implements iAddress {
  line1: string;
  line2: string;
  city: string;
  postalCode: string;
  province: string;
  // country: string;
  constructor(address?: iAddress) {
    this.line1 = address.line1 || null;
    this.line2 = address.line2 || null;
    this.postalCode = address.postalCode || null;
    this.city = address.city || null;
    this.province = address.province || null;
  }
  toDynamics(): object {
    return {}
  }
  fromDynamics(dynamicsObject) {
  }
}