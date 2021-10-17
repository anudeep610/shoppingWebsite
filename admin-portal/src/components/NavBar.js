import React from 'react'
import { Nav, Navbar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { signout } from '../actions';

export default function NavBar() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(signout());
    };

    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span className="nav-link" onClick={logout} style={{cursor:'pointer'}}>
                        Signout
                    </span>
                </li>
            </Nav>
        );
    };

    const renderNonLoggedInLinks = () => {
        return (
            <Nav>
                {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
                <li className="nav-item">
                    <NavLink to="signin" className="nav-link">
                        Signin
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="signup" className="nav-link">
                        Signup
                    </NavLink>
                </li>
            </Nav>
        );
    };

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }} sticky="top">
                <Container >
                    <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse style={{ justifyContent: "end" }} id="responsive-navbar-nav">
                    {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
