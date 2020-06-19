export interface iTask {
  status: string;
  isCompleted: boolean;
  taskName: string;
  taskTitle: string;
  taskDescription: string;
  deadline: Date;
  submittedDate: Date;
  taskId: string;
  formType: string;
}
