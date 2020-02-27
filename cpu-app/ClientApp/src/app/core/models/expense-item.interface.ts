export interface iExpenseItem {
  cost: number;
  fundedFromVscp: number;
  itemName: string;
  uuid: string;
  tooltip?: string;
  otherExpenseDescription?: string;
  isActive?: boolean;
}
