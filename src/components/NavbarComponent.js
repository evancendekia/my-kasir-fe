import React from "react";
import {Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'

const NavbarComponent = () => {
  return (
    <Navbar variant="dark" expand="md" className="px-3 py-1">
      <Navbar.Brand href="#home"><strong>Kasir</strong> App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-between">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Meja</Nav.Link>
          <Nav.Link href="#link">Resto</Nav.Link>
          <Nav.Link href="#link">Laporan</Nav.Link>
          <Nav.Link href="#link">Statistik</Nav.Link>
          <Nav.Link href="#link">Pengaturan</Nav.Link>
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
