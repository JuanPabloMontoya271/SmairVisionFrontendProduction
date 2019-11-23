import React, { Component } from 'react';
import './scss/App.scss';
import Header from './Components/Headers/Header'
import Upload from './Components/SourceTree/Upload.js'
import Content from './Components/Content/Content.js'
import PropTypes from 'prop-types'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import MyAppBar from  './Components/PatientManager/AppBar.js'
class App extends Component {
  
  constructor (props){
    super(props)
    this.state = {

      visible: 'visible'
    }
  }
  componentDidMount(){
    const currentloc = window.location.pathname
    console.log(currentloc);
    const c = currentloc.split('/')
    console.log(c)
    
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
  
  
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div>
      
      <div style = {{'visibility': visible}}>

      <MyAppBar />
      </div>
      
      <Content body = {children}/>


      </div>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
