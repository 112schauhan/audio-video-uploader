export interface File {
    _id: string;
    title: string;
    description: string;
    fileUrl: string;
    fileType: 'video' | 'audio';
    duration: number;
}