// src/services/apiTaskService.ts
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

type UpdateTaskData = {
  title: string;
  context: string;
  task_date: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
};

// UPDATE: Disesuaikan dengan Request User (date string & priority string)
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

// === READ ===
export const getTasks = async (params?: TaskQueryParams): Promise<Task[]> => {
  // Axios akan mengirim: /student/tasks?date=2025-11-20&priority=medium
  const response = await apiClient.get('/student/tasks', { params });
  const apiData = (response.data.data || []) as BackEndTask[];
  return apiData.map(translateToFrontEnd);
};

// === CREATE ===
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

// === UPDATE ===
export const updateTask = async (task: Task, newStatus: boolean): Promise<Task> => {
  const apiData: UpdateTaskData = {
    title: task.label,
    context: task.context,
    task_date: task.dueDate,
    priority: task.priority,
    completed: newStatus,
  };
  
  const response = await apiClient.put(`/student/tasks/${task.id}`, apiData);
  const responseData = response.data.data ? response.data.data : response.data;
  return translateToFrontEnd(responseData);
};

// === DELETE ===
export const deleteFolder = async (taskId: number): Promise<void> => {
  await apiClient.delete(`/student/tasks/${taskId}`);
};