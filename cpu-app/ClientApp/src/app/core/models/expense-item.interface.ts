export interface iExpenseItem {
  uuid: string;
  totalCost: number;
  tooltip?: string;
  itemName: string;
  fundedFromVscp: number;
}
