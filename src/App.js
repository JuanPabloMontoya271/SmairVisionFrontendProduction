import React, { Component } from 'react';
import './scss/App.scss';
import Header from './Components/Headers/Header'
import Viewer from './Components/Viewer'
import Upload from './Components/SourceTree/Upload.js'
import Content from './Components/Content/Content.js'
import PropTypes from 'prop-types'
class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired
  };
  render() {
    const {children}= this.props;
    return (
      <div>
      <Header/>
      <Content body = {children}/>
      

      </div>
    );
  }
}

export default App;
