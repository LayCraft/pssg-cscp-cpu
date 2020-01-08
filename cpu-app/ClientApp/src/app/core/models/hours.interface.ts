export interface iHours {
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  saturday?: boolean;
  sunday?: boolean;
  open: string; // just used for the hour representation
  closed: string; // should look like this 11:21
  hoursId: string;
}
