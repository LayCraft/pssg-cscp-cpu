import { iExpenseItem } from "./expense-item.interface";

export class ExpenseItem implements iExpenseItem {
  itemName: string;
  tooltip: string;
  totalCost: number;
  fundedFromVscp: number;
  constructor(xi?: iExpenseItem) {
    if (xi) {
      this.itemName = xi.itemName || null;
      this.tooltip = xi.tooltip || null;
      this.totalCost = xi.totalCost || null;
      this.fundedFromVscp = xi.fundedFromVscp || null;
    }
  }
}
