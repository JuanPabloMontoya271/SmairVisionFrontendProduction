import React, {Component} from 'react';
//import logo from './logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import logoSV from './logoSV.png'





class Header extends Component{
  render(){

    return (
      <Navbar bg="light" expand="lg">
<Navbar.Brand href="#home">Smair Vision</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto">
    <Nav.Link href="/Patients">Patients</Nav.Link>

    <NavDropdown title="Organ" id="basic-nav-dropdown">
      <NavDropdown.Item href="/DefaultView">Lungs</NavDropdown.Item>
      <NavDropdown.Item href="/DefaultView">Brain</NavDropdown.Item>
      <NavDropdown.Item href="/DefaultView">Liver</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Modality" id="basic-nav-dropdown">
        <NavDropdown.Item href="/DefaultView">DX</NavDropdown.Item>
        <NavDropdown.Item href="/DefaultView">CT</NavDropdown.Item>
        <NavDropdown.Item href="/DefaultView">PETCT</NavDropdown.Item>
        </NavDropdown>
      <Nav.Link href="#link">Reports</Nav.Link>
  </Nav>
  <img src = {logoSV} alt = 'Smair Vision' style = {{width:'100px', height:'80px', 'marginRight': '30px'}}/>
</Navbar.Collapse>
</Navbar>
    );
  }
  }


export default Header;
