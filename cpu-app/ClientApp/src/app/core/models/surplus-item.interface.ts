export interface iSurplusItem {
    id: string;
    surplus_plan_id: string;
    name?: string;
    expense_name?: string;
    justification?: string;
    amount: number;
    amount_mask: string;
    expenditures_q1?: number;
    expenditures_q2?: number;
    expenditures_q3?: number;
    expenditures_q4?: number;
}
