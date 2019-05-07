import React, { Component } from 'react';
import './scss/App.scss';
import Header from './Components/Headers/Header'
import Viewer from './Components/Viewer'
import Upload from './Components/SourceTree/Upload.js'
class App extends Component {


  render() {
    return (
      <div>
      <Header/>
      <Viewer/>
      <Upload/>

      </div>
    );
  }
}

export default App;
