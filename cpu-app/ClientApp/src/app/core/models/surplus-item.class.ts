import { iSurplusItem } from "./surplus-item.interface";

export class SurplusItem implements iSurplusItem {
    id: string;
    surplus_plan_id: string;
    name?: string;
    expense_name?: string;
    amount: number;
    amount_mask: string;
    justification?: string;
    expenditures_q1?: number;
    expenditures_q2?: number;
    expenditures_q3?: number;
    expenditures_q4?: number;

    constructor(si?: iSurplusItem) {
        if (si) {
            Object.assign(this, si);
        }
    }
}