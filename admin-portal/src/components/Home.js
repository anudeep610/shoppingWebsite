import React from 'react'
import {Col, Row, Container} from "react-bootstrap";
import Sidebar from './Sidebar';
import "./styles/home.css";


export default function Home() {
    return (
        <div>
        <Container fluid>
        <Row>
            <Sidebar />
            <Col md={10} style={{marginLeft:"auto"}}> container</Col>
        </Row>
        </Container>
        </div>
    )
}
