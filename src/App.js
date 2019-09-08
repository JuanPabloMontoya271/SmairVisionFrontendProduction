import React, { Component } from 'react';
import './scss/App.scss';
import Header from './Components/Headers/Header'
import Viewer from './Components/Viewer'
import Upload from './Components/SourceTree/Upload.js'
import Content from './Components/Content/Content.js'
import PropTypes from 'prop-types'


class App extends Component {
  
  constructor (props){
    super(props)
    this.state = {

      visible: 'visible'
    }
  }
  componentDidMount(){
    const currentloc = window.location.pathname
    let visibility = 'visible'
    switch (currentloc) {
      case '/':
          visibility='hidden'
        break;
    
      default:
        visibility = 'visible'
        break;
    }
    this.setState({visible: visibility})

  }
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  render() {
    
    
    
    const {children}= this.props;
    let {visible}  = this.state
    console.log(children);
  
    return (
      <div>
      <div style = {{'visibility': visible}}>

      <Header />
      </div>
      
      <Content body = {children}/>


      </div>
    );
  }
}

export default App;
