export interface iRevenueSource {
	revenueSourceName: string;
	cash: number;
	inKindContribution: number;
}

export class RevenueSource implements iRevenueSource {
	revenueSourceName: string;
	cash: number;
	inKindContribution: number;
	constructor(rs?: iRevenueSource) {
		if (rs) {
			this.revenueSourceName = rs.revenueSourceName || null;
			this.cash = rs.cash || null;
			this.inKindContribution = rs.inKindContribution || null;
		}
	}
}