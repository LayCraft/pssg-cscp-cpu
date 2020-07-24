export interface iPaymentStatus {
    Q1: number;
    Q2: number;
    Q3: number;
    Q4: number;
    oneTime: number;
}

export enum PaymentStatusCode {
    Draft = 1,
    Submitted = 100000000,
    Exception = 100000001,
    Cancel_Submission = 100000006,
    Resubmit = 100000007,
    On_Hold = 100000008,
    Paid = 2,
    Not_Applicable = 0,
}
