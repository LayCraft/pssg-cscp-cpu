export interface iRevenueSource {
	revenueSourceName: string;
	cash: number;
	inKindContribution: number;
	other: string;
}

export class RevenueSource implements iRevenueSource {
	revenueSourceName: string;
	cash: number;
	inKindContribution: number;
	other: string;
	constructor(rs?: iRevenueSource) {
		if (rs) {
			this.revenueSourceName = rs.revenueSourceName || null;
			this.cash = rs.cash || 0;
			this.inKindContribution = rs.inKindContribution || 0;
			this.other = rs.other || '';
		}
	}
}