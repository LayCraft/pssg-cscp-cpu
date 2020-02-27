import { iSalaryAndBenefits } from "./salary-and-benefits.interface";
import { uuidv4 } from "../constants/uuidv4";

export class SalaryAndBenefits implements iSalaryAndBenefits {
  uuid: string;
  title: string;
  salary: number;
  benefits: number;
  fundedFromVscp: number;
  totalCost: number;
  isActive: boolean;
  constructor(s?: iSalaryAndBenefits) {
    if (s) {
      this.title = s.title || '';
      this.salary = s.salary || 0;
      this.benefits = s.benefits || 0;
      this.fundedFromVscp = s.fundedFromVscp || 0;
      this.totalCost = s.totalCost || 0;
      this.uuid = s.uuid || null;
      this.isActive = s.isActive || true;
    } else {
      this.isActive = true;
      this.uuid = null;
    }
  }
}
