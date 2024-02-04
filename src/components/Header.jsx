//Header.jsx
// Header.jsx
import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import Typology from "../images/typology.png";
import "../css/style.css";

const Header = () => (
    <Navbar className="prev-header px-4 d-flex justify-content-between" expand="lg" variant="dark" >
        <div as={Link} to="/" className="mr-auto">
            <img src={Typology} alt='logo' />
        </div>
        <div className="div-navb-header">
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto gap-5" >
                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/About">About</Nav.Link>
                    <Nav.Link as={Link} to="/Contact">Contact</Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </div>

    </Navbar>
);

export default Header;





