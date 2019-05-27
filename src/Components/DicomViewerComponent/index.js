import React, { Component } from 'react';
import '../../scss/App.scss';
import Header from '../Headers/Header'
import Viewer from '../Viewer'
import Upload from '../SourceTree/Upload.js'
class DicomViewer extends Component {

  render() {
    let {param} = this.props.match.params

   return (
      <div>
      <Viewer mname ={param}/>
      </div>
    );
  }
}

export default DicomViewer;
