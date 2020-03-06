import { iTask } from "./task.interface";
import { iProgram } from "./program.interface";
import { iMessage } from "./message.interface";

export interface iContract {
  // isCompleted: boolean; // basically useless
  category: string; // upcoming, current, past
  contractId: string;
  contractNumber: string;
  status: string;
  programs: iProgram[];
  tasks: iTask[];
  completedTasks: iTask[];
  //messages: iMessage[]; // TODO: Will need to add this to the model
}
