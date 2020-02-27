import { iRevenueSource } from "./revenue-source.interface";

export class RevenueSource implements iRevenueSource {
  revenueSourceName: string;
  cash: number;
  inKindContribution: number;
  other: string;
  revenueSourceId: string;
  isActive: boolean;
  constructor(rs?: iRevenueSource) {
    if (rs) {
      this.revenueSourceName = rs.revenueSourceName || null;
      this.cash = rs.cash || null;
      this.inKindContribution = rs.inKindContribution || null;
      this.other = rs.other || null;
      this.revenueSourceId = rs.revenueSourceId || null;
      this.isActive = rs.isActive || true;
    }
    else {
      this.isActive = true;
    }
  }
}
