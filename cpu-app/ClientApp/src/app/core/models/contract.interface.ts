import { iTask } from "./task.interface";
import { iProgram } from "./program.interface";

export interface iContract {
  // isCompleted: boolean; // basically useless
  category: string;
  contractId: string;
  contractNumber: string;
  status: string;
  programs?: iProgram[];
  tasks?: iTask[];
}
