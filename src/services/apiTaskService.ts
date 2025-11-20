import apiClient from '../lib/axios';
import type { Task } from '../types/task.types';

type BackEndTask = {
  id: number;
  title: string;
  context: string;
  priority: 'low' | 'medium' | 'high';
  task_date: string;
  completed: boolean;
  user_id: number;
};

export type NewTaskData = {
  title: string;
  context: string;
  task_date: string;
  priority: 'low' | 'medium' | 'high';
};

type UpdateTaskPayload = {
  title?: string;
  context?: string;
  task_date?: string;
  priority?: 'low' | 'medium' | 'high';
  completed?: boolean;
};

export type TaskQueryParams = {
  date?: string;     // format 'YYYY-MM-DD'
  priority?: 'low' | 'medium' | 'high';
};

const translateToFrontEnd = (beTask: BackEndTask): Task => {
  return {
    id: beTask.id,
    label: beTask.title,
    context: beTask.context,
    completed: beTask.completed,
    dueDate: beTask.task_date,
    priority: beTask.priority,
  };
};

export const getTasks = async (params?: TaskQueryParams): Promise<Task[]> => {
  const response = await apiClient.get('/student/tasks', { params });
  const apiData = (response.data.data || []) as BackEndTask[];
  return apiData.map(translateToFrontEnd);
};

export const createTask = async (data: NewTaskData): Promise<Task> => {
  let formattedDate = data.task_date;
  if (!formattedDate.includes('T')) {
    formattedDate = `${formattedDate}T00:00:00Z`;
  }

  const payload = { ...data, task_date: formattedDate };
  
  const response = await apiClient.post('/student/tasks', payload);
  const responseData = response.data.data ? (Array.isArray(response.data.data) ? response.data.data[0] : response.data.data) : response.data;
  return translateToFrontEnd(responseData);
};

export const updateTask = async (taskId: number, data: UpdateTaskPayload): Promise<Task> => {
  const response = await apiClient.put(`/student/tasks/${taskId}`, data);
  const responseData = response.data.data ? response.data.data : response.data;
  return translateToFrontEnd(responseData);
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await apiClient.delete(`/student/tasks/${taskId}`);
};