'use client'

import { File } from '@/types'
import { getFiles } from '@/utils/api'
import React, { useEffect, useState } from 'react'
import { Badge, ListGroup } from 'react-bootstrap'

const FileList: React.FC = () => {
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fetchedFiles = await getFiles()
        setFiles(fetchedFiles)
      } catch (error) {
        console.error('Error fetching files:', error)
      }
    }

    fetchFiles()
  }, [])

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ListGroup>
        {files.map((file) => (
          <ListGroup.Item key={file._id} className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{file.title}</div>
              {file.description}
              <div>
                <Badge bg={file.fileType === 'video' ? 'primary' : 'secondary'} pill>
                  {file.fileType}
                </Badge>{' '}
                <Badge bg="info" pill>
                  {file.duration.toFixed(2)} seconds
                </Badge>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default FileList