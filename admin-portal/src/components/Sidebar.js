import React from 'react'
import { Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import "./styles/sidebar.css"

export default function Sidebar() {
    return (
        <Col md={2} className="sidebar">
                <ul>
                    <li><NavLink to={"/home"}>Home</NavLink></li>
                    <li><NavLink to={"/products"}>Products</NavLink></li>
                    <li><NavLink to={"/orders"}>Orders</NavLink></li>
                    <li><NavLink to={"/category"}>categories</NavLink></li>
                </ul>
        </Col>
    )
}
