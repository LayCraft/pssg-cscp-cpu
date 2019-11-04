import { iTask } from "./task";
import { iProgram } from "./program";

export interface iContract {
  category: string;
  contractId: string;
  contractNumber: string;
  // isCompleted: boolean; // basically useless
  programs: iProgram[];
  status: string;
  tasks: iTask[];
}
