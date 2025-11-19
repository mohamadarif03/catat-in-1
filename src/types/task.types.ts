export type Task = {
  id: number;
  label: string;
  context: string; 
  completed: boolean;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
};