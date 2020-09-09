export interface iSurplusItem {
    id: string;
    surplus_plan_id: string;
    name?: string;
    justification?: string;
    allocated_amount: number;
    expenditures_q1?: number;
    expenditures_q2?: number;
    expenditures_q3?: number;
    expenditures_q4?: number;
}
