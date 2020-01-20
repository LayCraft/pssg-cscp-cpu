import { iExpenseItem } from "./expense-item.interface";
import { uuidv4 } from "../constants/uuidv4";

export class ExpenseItem implements iExpenseItem {
  itemName: string;
  tooltip: string;
  cost: number;
  fundedFromVscp: number;
  uuid: string;
  constructor(xi?: iExpenseItem) {
    if (xi) {
      this.itemName = xi.itemName || null;
      this.tooltip = xi.tooltip || null;
      this.cost = xi.cost || null;
      this.fundedFromVscp = xi.fundedFromVscp || null;
      this.uuid == xi.uuid || null;
    } else {
      this.uuid = null;
    }
  }
}
