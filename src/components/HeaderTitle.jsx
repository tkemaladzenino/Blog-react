// HeaderTitle.js

import React from "react";
import { Navbar } from 'react-bootstrap';
import Logo from "../images/logo.png";
import "../css/style.css";

const HeaderTitle = () => (
    <Navbar className="hdr1 px-4" expand="lg" variant="dark" bg="dark">
        <Navbar.Brand>
            <img src={Logo} alt='Logo' />
        </Navbar.Brand>
    </Navbar>
);

export default HeaderTitle;
