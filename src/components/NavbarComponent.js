import React from "react";
import {Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

const NavbarComponent = () => {
  const location = useLocation();
  console.log('location.pathname',location.pathname)
  return (
    <Navbar variant="dark" expand="md" className="px-3 py-1">
      <Navbar.Brand href="#home">
        <Image
          alt=""
          src="assets/images/app/logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top mx-2"
          rounded 
        />
        <strong>VIXY Billiard</strong> 
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-between">
        <Nav className="mr-auto">
          <Nav.Link href="/" className={location.pathname == '/' || location.pathname == "/home" ? "active" : ""} >Home</Nav.Link>
          <Nav.Link href="/table" className={location.pathname == "/table" ? "active" : ""} >Meja</Nav.Link>
          <Nav.Link href="/resto" className={location.pathname == "/resto" ? "active" : ""} >Resto</Nav.Link>
          <Nav.Link href="report" className={location.pathname == "/report" ? "active" : ""} >Laporan</Nav.Link>
          <Nav.Link href="/chart" className={location.pathname == "/chart" ? "active" : ""}>Statistik</Nav.Link>
          <Nav.Link href="/setting" className={location.pathname == "/setting" ? "active" : ""}>Pengaturan</Nav.Link>
        </Nav>
        <div xs="auto" className="mb-0">
          <Nav className="mr-4">
            <NavDropdown title="" className="dropleft" drop={'start'}>
                <NavDropdown.Item href="#action/3.1" >Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            <Navbar.Brand href="#home" className="ml-0 mr-">
              Rosidi
              <Image
                alt=""
                src="assets/users/profile/profile_1.jpg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                style={{marginLeft:"10px"}}
                rounded 
              />
            </Navbar.Brand>
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
