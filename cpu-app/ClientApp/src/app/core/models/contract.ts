import { iTask } from "./task";
import { iProgram } from "./program";

export interface iContract {
  contractNumber: string;
  contractId: string;
  isCompleted: boolean;
  status: string;
  tasks: iTask[];
  programs: iProgram[];
}
