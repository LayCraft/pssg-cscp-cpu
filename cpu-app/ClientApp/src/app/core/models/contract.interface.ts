import { iTask } from "./task.interface";
import { iProgram } from "./program.interface";

export interface iContract {
  // isCompleted: boolean; // basically useless
  category: string; // upcoming, current, past
  contractId: string;
  contractNumber: string;
  status: string;
  programs: iProgram[];
  tasks: iTask[];
  completedTasks: iTask[];
}
