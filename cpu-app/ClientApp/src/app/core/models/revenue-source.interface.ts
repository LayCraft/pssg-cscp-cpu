export interface iRevenueSource {
  revenueSourceName: string;
  cash: number;
  cashMask: string;
  inKindContribution: number;
  inKindContributionMask: string;
  total: number;
  totalMask: string;
  other: string;//if they have added their own then this is the field that represents their entry
  revenueSourceId: string;
  isActive: boolean;
}
