import { iExpenseItem } from "./expense-item.interface";
import { uuidv4 } from "../constants/uuidv4";

export class ExpenseItem implements iExpenseItem {
  itemName: string;
  tooltip: string;
  totalCost: number;
  fundedFromVscp: number;
  uuid: string;
  constructor(xi?: iExpenseItem) {
    if (xi) {
      this.itemName = xi.itemName || null;
      this.tooltip = xi.tooltip || null;
      this.totalCost = xi.totalCost || null;
      this.fundedFromVscp = xi.fundedFromVscp || null;
      this.uuid == xi.uuid || uuidv4();
    } else {
      this.uuid = uuidv4();
    }
  }
}
