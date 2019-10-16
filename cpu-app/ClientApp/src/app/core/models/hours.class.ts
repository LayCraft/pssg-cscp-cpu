export interface iHours {
	monday: boolean;
	tuesday: boolean;
	wednesday: boolean;
	thursday: boolean;
	friday: boolean;
	saturday: boolean;
	sunday: boolean;
	open: Date; // just used for the hour representation
	closed: Date;
}
export class Hours implements iHours {
	monday: boolean;
	tuesday: boolean;
	wednesday: boolean;
	thursday: boolean;
	friday: boolean;
	saturday: boolean;
	sunday: boolean;
	open: Date; // just used for the hour representation
	closed: Date;
	constructor(hours?: iHours) {
		if (hours) {
			this.monday = hours.monday || null;
			this.tuesday = hours.tuesday || null;
			this.wednesday = hours.wednesday || null;
			this.thursday = hours.thursday || null;
			this.friday = hours.friday || null;
			this.saturday = hours.saturday || null;
			this.sunday = hours.sunday || null;
			this.open = new Date(hours.open) || null;
			this.closed = new Date(hours.closed) || null;
		}
	}
}