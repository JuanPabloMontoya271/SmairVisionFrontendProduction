import React, {Component} from 'react';
//import logo from './logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import logoSV from './logoSV.png'
import store from '../../store'




class Header extends Component{
  constructor(props){
            super(props)
            this.state = {

              titleOrgan: 'Organ',
              titleModality: 'Modality'
            }
            this.LiverClicked =this.LiverClicked.bind(this)
            this.LungsClicked =this.LungsClicked.bind(this)
            this.BrainClicked =this.BrainClicked.bind(this)
            this.dxClicked =this.dxClicked.bind(this)
            this.ctClicked =this.ctClicked.bind(this)
            this.petctClicked =this.petctClicked.bind(this)
  }
  LiverClicked = ()=> {
    store.dispatch({type: 'select_organ', organ: 'Liver'})
    this.setState({titleOrgan:'Liver'})
  }
  LungsClicked = ()=> {
    store.dispatch({type: 'select_organ', organ: 'Chest'})
    this.setState({titleOrgan:'Chest'})
  }
  BrainClicked = ()=> {
    store.dispatch({type: 'select_organ', organ: 'Brain'})
    this.setState({titleOrgan:'Brain'})
  }
  dxClicked = ()=> {
    store.dispatch({type: 'modality', Modality: 'DX'})
    this.setState({titleModality:'DX'})
  }
  ctClicked = ()=> {
    store.dispatch({type: 'modality', Modality: 'CT'})
    this.setState({titleModality:'CT'})
  }
  petctClicked = ()=> {
    store.dispatch({type: 'modality', Modality: 'PETCT'})
    this.setState({titleModality:'PETCT'})
  }
  render(){

    return (
      <Navbar bg="light" expand="lg">
<Navbar.Brand href="/Profile">Smair Vision</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto">
    <Nav.Link href="/">Patients</Nav.Link>

    <NavDropdown title={this.state.titleOrgan } id="basic-nav-dropdown">
      <NavDropdown.Item onClick = { this.LungsClicked}>Chest</NavDropdown.Item>
      <NavDropdown.Item onClick = { this.BrainClicked}>Brain</NavDropdown.Item>
      <NavDropdown.Item onClick = { this.LiverClicked}>Liver</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title={this.state.titleModality} id="basic-nav-dropdown">
        <NavDropdown.Item onClick = { this.dxClicked}>DX</NavDropdown.Item>
        <NavDropdown.Item onClick = { this.ctClicked}>CT</NavDropdown.Item>
        <NavDropdown.Item onClick = { this.petctClicked}>PETCT</NavDropdown.Item>
        </NavDropdown>
      <Nav.Link href="/Reportes">Reports</Nav.Link>
  </Nav>
  <img src = {logoSV} alt = 'Smair Vision' style = {{width:'100px', height:'80px', 'marginRight': '30px'}}/>
</Navbar.Collapse>
</Navbar>
    );
  }
  }


export default Header;
