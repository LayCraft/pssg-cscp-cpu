export interface iRevenueSource {
  revenueSourceName: string;
  cash: number;
  inKindContribution: number;
  other: string;//if they have added their own then this is the field that represents their entry
}

export class RevenueSource implements iRevenueSource {
  revenueSourceName: string;
  cash: number;
  inKindContribution: number;
  other: string;
  constructor(rs?: iRevenueSource) {
    if (rs) {
      this.revenueSourceName = rs.revenueSourceName || null;
      this.cash = rs.cash || null;
      this.inKindContribution = rs.inKindContribution || null;
      this.other = rs.other || null;
    }
  }
}
