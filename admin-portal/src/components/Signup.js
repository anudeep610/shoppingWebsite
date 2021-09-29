import React from 'react'
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { signup } from '../actions/auth';
import { useState } from 'react';

export default function Signup() {

    const auth = useSelector(state => state.auth );
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phno, setPhno] = useState("");
    const user = useSelector(state => state.user)
    // const [error, setError] = useState("");
    const dispatch = useDispatch();

    if(auth.authenticate){
        return <Redirect to={"/"} />
    }

    if(user.loading){
        return <p>Loading</p>
    }

    const userSignUp = (e) => {
        e.preventDefault();
        const user={
            email,password,name,username,phno
        };
        user.role="admin";
        dispatch(signup(user));
    }

    return (
        <>
            <Container>
                <Row style={{marginTop:"5rem"}}>
                    <Col md={{span:6, offset: 3}}>
                        <Form onSubmit={userSignUp}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" autoComplete="on" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Username</Form.Label>
                                <Form.Control value={username} onChange={(e)=>setUserName(e.target.value)} type="text" placeholder="Name" autoComplete="on" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" autoComplete="on" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" autoComplete="on" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Mobile No</Form.Label>
                                <Form.Control value={phno} onChange={(e)=>setPhno(e.target.value)} type="text" placeholder="Mobile Number" autoComplete="on" />
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
