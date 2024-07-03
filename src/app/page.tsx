import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FileUpload from '../components/FileUpload'
import FileList from '../components/FileList'

export default function Home() {
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Video and Audio Upload App</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FileUpload />
        </Col>
        <Col md={6}>
          <FileList />
        </Col>
      </Row>
    </Container>

  )
}