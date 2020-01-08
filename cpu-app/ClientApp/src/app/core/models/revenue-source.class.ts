import { iRevenueSource } from "./revenue-source.interface";

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
