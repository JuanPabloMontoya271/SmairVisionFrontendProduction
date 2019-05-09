import React, { Component } from 'react';
import '../../scss/App.scss';
import Header from '../Headers/Header'
import Viewer from '../Viewer'
import Upload from '../SourceTree/Upload.js'
class DicomViewer extends Component {


  render() {
    return (
      <div>
      <Viewer/>
      </div>
    );
  }
}

export default DicomViewer;
