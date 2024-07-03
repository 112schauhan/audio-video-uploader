'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { uploadFile } from '../utils/api';
import { AxiosProgressEvent } from 'axios';

const FileUpload: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    setUploading(true);
    setError(null);
    try {
      await uploadFile(formData, (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });
      setTitle('');
      setDescription('');
      setFile(null);
      setProgress(0);
      alert('File uploaded successfully');
    } catch (error) {
      console.error(error);
      setError('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>File</Form.Label>
        <Form.Control
          type="file"
          accept="video/*,audio/*"
          onChange={handleFileChange}
          required
        />
      </Form.Group>

      {uploading && (
        <ProgressBar now={progress} label={`${progress}%`} className="mb-3" />
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
    </Form>
  );
};

export default FileUpload;