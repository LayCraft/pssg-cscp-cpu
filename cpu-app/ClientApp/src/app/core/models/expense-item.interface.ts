export interface iExpenseItem {
  uuid: string;
  cost: number;
  tooltip?: string;
  itemName: string;
  fundedFromVscp: number;
}
