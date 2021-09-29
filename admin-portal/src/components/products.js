import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import Sidebar from './Sidebar';

export default function products() {
    return (
        <div>
        <Container fluid>
        <Row>
            <Sidebar />
            <Col md={10} style={{marginLeft:"auto"}}> products</Col>
        </Row>
        </Container>
        </div>
    )
}
