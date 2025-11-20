// src/services/apiLibraryService.ts
import apiClient from '../lib/axios';
import type { Folder } from '../types/folder.types';

type FrontEndFolderData = {
  name: string;
  iconColor: string;
};

type BackEndPackagePostData = {
  title: string;
  color_icon: string;
};

type BackEndPackageGetResponse = {
  id: number;
  title: string;
  colorIcon: string;
  user_id: number;
  created_at: string;
};

// === READ ===
export const getFolders = async (): Promise<Folder[]> => {
  const response = await apiClient.get('/student/packages');
  
  // PERBAIKAN DI SINI: Gunakan array kosong jika data null
  const apiData = (response.data.data || []) as BackEndPackageGetResponse[];

  const frontEndData: Folder[] = apiData.map(beFolder => ({
    id: beFolder.id,
    name: beFolder.title,
    iconColor: beFolder.colorIcon,
    createdAt: beFolder.created_at,
    fileCount: 0 
  }));

  return frontEndData;
};

// === CREATE ===
export const createFolder = async (data: FrontEndFolderData): Promise<Folder> => {
  const apiData: BackEndPackagePostData = {
    title: data.name,
    color_icon: data.iconColor 
  };
  
  const response = await apiClient.post('/student/packages', apiData);
  return response.data;
};

// === UPDATE ===
export const updateFolder = async (folderId: number, data: FrontEndFolderData): Promise<Folder> => {
  const apiData: BackEndPackagePostData = {
    title: data.name,
    color_icon: data.iconColor 
  };
  
  const response = await apiClient.put(`/student/packages/${folderId}`, apiData);
  return response.data;
};

// === DELETE ===
export const deleteFolder = async (folderId: number): Promise<void> => {
  await apiClient.delete(`/student/packages/${folderId}`);
};