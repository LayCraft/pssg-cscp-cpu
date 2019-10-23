import { iTask } from "./task";

export interface iContract {
  contractNumber: string;
  contractId: string;
  isCompleted: boolean;
  status: string;
  tasks: iTask[];
}
