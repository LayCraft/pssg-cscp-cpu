export interface iTask {
  status: string;
  isCompleted: boolean;
  taskName: string;
  taskDescription: string;
  deadline: Date;
  taskId: string;
  formType: string;
}
