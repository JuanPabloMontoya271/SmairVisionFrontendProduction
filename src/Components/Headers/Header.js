import React, {Component} from 'react';
//import logo from './logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';






class Header extends Component{
  render(){

    return (
      <Navbar bg="light" expand="lg">
<Navbar.Brand href="#home">Smair Vision</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto">
    <Nav.Link href="#home">Patients</Nav.Link>

    <NavDropdown title="Organ" id="basic-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">Lungs</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Brain</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">Liver</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Modality" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">DX</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">CT</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">PETCT</NavDropdown.Item>
        </NavDropdown>
      <Nav.Link href="#link">Reports</Nav.Link>
  </Nav>
  <Form inline>
    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    <Button variant="outline-success">Search</Button>
  </Form>
</Navbar.Collapse>
</Navbar>
    );
  }
  }


export default Header;
