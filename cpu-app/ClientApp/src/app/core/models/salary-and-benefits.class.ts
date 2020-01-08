import { iSalaryAndBenefits } from "./salary-and-benefits.interface";

export class SalaryAndBenefits {
  title: string;
  salary: number;
  benefits: number;
  fundedFromVscp: number;
  totalCost: number;
  constructor(s: iSalaryAndBenefits) {
    this.title = s.title || '';
    this.salary = s.salary || 0;
    this.benefits = s.benefits || 0;
    this.fundedFromVscp = s.fundedFromVscp || 0;
    this.totalCost = s.totalCost || 0;
  }
}
