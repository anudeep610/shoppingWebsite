import React from 'react'
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import {login} from "../actions/index";
import {useDispatch, useSelector} from "react-redux";
import { useState } from 'react';
import { Redirect } from 'react-router';

export default function Signin(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");
    const auth = useSelector(state => state.auth );
    const dispatch=useDispatch();
    const userLogin=(e)=>{
        e.preventDefault();
        const user={
            email,password
        };
        dispatch(login(user));
    }

    if(auth.authenticate){
        return <Redirect to={"/"} />
    }
    return (
        <>
            <Container>
                <Row style={{marginTop:"5rem"}}>
                    <Col md={{span:6, offset: 3}}>
                        <Form onSubmit={userLogin}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" autoComplete="on" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" autoComplete="on"  />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
