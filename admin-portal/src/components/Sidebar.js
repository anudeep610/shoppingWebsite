import React from 'react'
import { Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <Col md={2} className="sidebar">
                <ul>
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    <li><NavLink to={"/products"}>Products</NavLink></li>
                    <li><NavLink to={"/orders"}>Orders</NavLink></li>
                </ul>
        </Col>
    )
}
