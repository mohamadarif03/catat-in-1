// src/services/apiLibraryService.ts
import apiClient from '../lib/axios';
import type { Folder } from '../types/folder.types';

// --- Tipe untuk Front-End ---
type FrontEndFolderData = {
  name: string;
  iconColor: string;
};

// --- Tipe untuk Back-End ---

// Tipe data yang DIKIRIM ke BE (POST/PUT)
type BackEndPackagePostData = {
  title: string;
  color_icon: string; // Sesuai pesan terakhir Anda (snake_case)
};

// Tipe data yang DITERIMA dari BE (GET)
type BackEndPackageGetResponse = {
  id: number;
  title: string;
  colorIcon: string; // Sesuai JSON yang Anda kirim (camelCase)
  user_id: number;
  created_at: string;
};

/**
 * === READ ===
 * Mengambil semua folder/paket
 */
export const getFolders = async (): Promise<Folder[]> => {
  // 1. Ambil data dari BE
  const response = await apiClient.get('/student/packages');
  
  // 2. Data ada di dalam 'response.data.data'
  const apiData = response.data.data as BackEndPackageGetResponse[];

  // 3. Terjemahkan dari format BE ke format FE (Folder)
  const frontEndData: Folder[] = apiData.map(beFolder => ({
    id: beFolder.id,
    name: beFolder.title,         // title -> name
    iconColor: beFolder.colorIcon, // colorIcon -> iconColor
    createdAt: beFolder.created_at,
    fileCount: 0 // API Anda belum mengirim ini, jadi kita 'mock'
  }));

  return frontEndData;
};

/**
 * === CREATE ===
 * Membuat folder/paket baru
 */
export const createFolder = async (data: FrontEndFolderData): Promise<Folder> => {
  const apiData: BackEndPackagePostData = {
    title: data.name,
    color_icon: data.iconColor 
  };
  
  // Kirim data
  const response = await apiClient.post('/student/packages', apiData);
  
  // (Asumsi respons BE setelah create juga perlu diterjemahkan,
  // tapi kita bisa abaikan untuk sekarang dan biarkan 'invalidateQueries' bekerja)
  return response.data;
};

/**
 * === UPDATE ===
 * Mengupdate folder/paket berdasarkan ID
 */
// Perhatikan: folderId sekarang 'number'
export const updateFolder = async (folderId: number, data: FrontEndFolderData): Promise<Folder> => {
  // Terjemahkan dari FE ke BE (PUT)
  const apiData: BackEndPackagePostData = {
    title: data.name,
    color_icon: data.iconColor // Tetap pakai color_icon
  };
  
  const response = await apiClient.put(`/student/packages/${folderId}`, apiData);
  return response.data;
};

/**
 * === DELETE ===
 * Menghapus folder/paket berdasarkan ID
 */
// Perhatikan: folderId sekarang 'number'
export const deleteFolder = async (folderId: number): Promise<void> => {
  await apiClient.delete(`/student/packages/${folderId}`);
};