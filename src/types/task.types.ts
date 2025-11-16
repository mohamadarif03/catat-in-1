export type Task = {
  id: string;
  label: string;
  context: string; 
  completed: boolean;
  dueDate: string; 
  priority: 'low' | 'medium' | 'high'; 
};