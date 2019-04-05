import React, { Component } from 'react';
import './scss/App.scss';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';

cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser
cornerstoneWADOImageLoader.configure({
  useWebWorkers: true,
});

//Add cornerstoneWADOImageLoaderCodecs.min and cornerstoneWADOImageLoaderWebWorker.min from 
//cornerstone-wado-image-loader to ImageLoaderScripts in public folder
try {
  //Configures loaders for web to avoud error: unexpected token <-
  cornerstoneWADOImageLoader.webWorkerManager.initialize({
      maxWebWorkers: 8,
      startWebWorkersOnDemand: true,
      webWorkerPath: '/ImageLoaderScripts/cornerstoneWADOImageLoaderWebWorker.min.js',
      webWorkerTaskPaths: [],
      taskConfiguration: {
          decodeTask: {
              loadCodecsOnStartup: true,
              initializeCodecsOnStartup: false,
              codecsPath: '/ImageLoaderScripts/cornerstoneWADOImageLoaderCodecs.min.js',
              usePDFJS: false,
              strict: true
          }
      }
  });
} catch (error) {
  throw new Error('cornerstoneWADOImageLoader is not loaded');
}


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      imgData: '',
      imgRawData: ''
    }
    //Reacts dicom-img element reference to load image
    this.dicomImg = null;
  }

  componentDidMount(){
    //Enables HTML5 element to use cornerstone
    cornerstone.enable(this.dicomImg)

    document.getElementById('select-file').addEventListener('change',(e)=>{
      //Extracts only one file from selected files
      const file = e.target.files[0];
      //Obtain specific format dicom image id 
      const imgId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
      
      this.dicomWebViewer(imgId);
    })
  }

  dicomWebViewer = (imgId)=>{
    //Loads image
    cornerstone.loadImage(imgId).then((image)=>{
      //Displays image
      cornerstone.displayImage(this.dicomImg, image)
      this.setState({
        imgData: image,
        imgRawData: image.data
      },()=>{
          let { imgData, imgRawData } = this.state
        // imgData only contains certain data, look at the object in 
        // console.log(img.Data) to view properties E.g.
          console.log(imgData.rows,'Rows in image data')

        // imgRawData contains all the infromation. For usage, you
        // need to use th specific code. E.g. with Int value
          console.log(imgRawData.uint16('x00280010'),'Rows in Image Raw Data ')


      })
    })
  }


  render() {
    return (
      <section id = "dicom-web-viewer">
        <div className = "select-file-holder">
          <input type = "file" id = "select-file"  />
          <div></div>
        </div>
        <div ref = {ref => {this.dicomImg = ref}} id="dicom-img" >
        </div>
      </section>
    );
  }
}

export default App;
