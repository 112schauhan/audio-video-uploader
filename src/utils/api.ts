import axios, { AxiosProgressEvent } from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface UploadedFile {
    _id: string;
    title: string;
    description: string;
    fileUrl: string;
    fileType: 'video' | 'audio';
    duration: number;
  }
  
  export const uploadFile = async (
    formData: FormData, 
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ): Promise<UploadedFile> => {
    const response = await axios.post<UploadedFile>(`${API_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
    });
    return response.data;
  };

export const getFiles = async () => {
  const response = await axios.get(`${API_URL}/upload`);
  return response.data;
};