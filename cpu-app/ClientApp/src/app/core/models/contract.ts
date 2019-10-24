import { iTask } from "./task";
import { iProgram } from "./program";

export interface iContract {
  category: string;
  contractId: string;
  contractNumber: string;
  isCompleted: boolean;
  programs: iProgram[];
  status: string;
  tasks: iTask[];
}
