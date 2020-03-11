import { iHours } from "./hours.interface";

export class Hours implements iHours {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  open: string; // just used for the hour representation
  closed: string; // should look like this 18:54
  hoursId: string;
  isActive: boolean;
  constructor(hours?: iHours) {
    if (hours) {
      this.monday = hours.monday || null;
      this.tuesday = hours.tuesday || null;
      this.wednesday = hours.wednesday || null;
      this.thursday = hours.thursday || null;
      this.friday = hours.friday || null;
      this.saturday = hours.saturday || null;
      this.sunday = hours.sunday || null;
      this.open = hours.open || null;
      this.closed = hours.closed || null;
      this.isActive = hours.isActive || true;
    }
    else {
      this.isActive = true;
    }
  }
}
