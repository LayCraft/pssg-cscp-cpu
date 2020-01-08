export interface iRevenueSource {
  revenueSourceName: string;
  cash: number;
  inKindContribution: number;
  other: string;//if they have added their own then this is the field that represents their entry
}
