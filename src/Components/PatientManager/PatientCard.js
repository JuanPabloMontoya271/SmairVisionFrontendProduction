import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card';
import { DragSource } from 'react-dnd'
import {
  Link
} from "react-router-dom";



class Widget extends Component{




  render(){
    const {item} = this.props;
   
    const linked = '/Viewer/'+ item.name
        return (<div><Card id = 'card' >
          <Card.Body><span><Link to ={linked}>{this.props.item.name}</Link></span></Card.Body>
        </Card></div>)



  }
}
export default Widget;
