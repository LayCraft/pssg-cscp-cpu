import { iAddress } from "./address.interface";

export interface iPerson {
  personId: string;
  userId?: string;
  address?: iAddress;
  deactivated?: boolean; // if true this deactivates
  email: string;
  fax?: string;
  firstName: string;
  lastName: string;
  me?: boolean; // is this the current user? If so this is "me".
  middleName?: string;
  phone?: string;
  title?: string;
}
