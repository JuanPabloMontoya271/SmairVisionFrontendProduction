import React, { Component } from 'react';
import * as nj from 'numjs'
import '../scss/App.scss';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';
import * as cornerstoneTools from 'cornerstone-tools'

import Button from 'react-bootstrap/Button';
import axios from 'axios'
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
function test_arrays(array){
        let response='default'
        axios.post('https://herokudjangoapp314.herokuapp.com/test/', {data:array}).then((res)=>{

            response = res
          console.log(res)})
          return response
}

class Viewer extends Component {

  constructor(props){
    super(props);
    this.state = {
      imgData: '',
      imgRawData: ''
    }
    //Reacts dicom-img element reference to load image
    this.dicomImg = null;
    this.clickHandler = this.clickHandler.bind(this)
    console.log(nj);
  }

clickHandler(){
  let counter =+1
  console.log(this.dicomImg);
  const vp = cornerstone.getViewport(this.dicomImg)
  console.log(vp);
  vp.scale+=.5

  cornerstone.setViewport(this.dicomImg, vp)
}
  componentDidMount(){
    //Enables HTML5 element to use cornerstone
    cornerstone.enable(this.dicomImg)

    document.getElementById('select-file').addEventListener('change',(e)=>{
      //Extracts only one file from selected files
      const file = e.target.files[0];
      //Obtain specific format dicom image id
      //const file2 ='https://s3.us-east-2.amazonaws.com/bucketdeprueba314/IM-0001-0001.dcm'


      const imgId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

      this.dicomWebViewer(imgId);
    })
  }

  dicomWebViewer = (imgId)=>{
    //Loads image

    cornerstone.loadImage(imgId).then((image)=>{
      //Displays image
      console.log(image);

      cornerstone.displayImage(this.dicomImg, image)




      this.setState({
        imgData: image,
        imgRawData: image.data,
        pixelData :image.getPixelData(),



      },()=>{

          let { imgData, imgRawData, pixelData, pixels} = this.state
        // imgData only contains certain data, look at the object in
        // console.log(img.Data) to view properties E.
        const viewport = cornerstone.getViewport(this.dicomImg)
        console.log("Viewport",viewport)
        console.log("Scale",viewport.scale)
        console.log("Total Width",this.dicomImg.clientWidth);
        cornerstone.resize(this.dicomImg)
        let w = this.dicomImg.clientWidth
        let h= this.dicomImg.clientHeight
        let columns = imgData.columns
        let rows = imgData.rows
        let s =(w/h)/(columns/rows)
        console.log(imgRawData);
        let array = Array.from(imgRawData.byteArray)

        console.log(array);
        viewport.scale =s
        cornerstone.setViewport(this.dicomImg, viewport)
        axios.post('http://127.0.0.1:8000/test/', {array}).then((res)=>{

          console.log(res);
        })

        console.log(viewport.scale)



        // imgRawData contains all the infromation. For usage, you
        // need to use th specific code. E.g. with Int value


          //var dimensions = [ array.length, array[0].length ];


          //Math.reshape(array, [imgData.rows, imgData.cols]);




      })

    })

  }


  render() {
    return (
      <section id = "dicom-web-viewer">
      <a href='https://s3.us-east-2.amazonaws.com/bucketdeprueba314/IM-0001-0001.dcm'>image</a>
        <div className = "select-file-holder">
          <input type = "file" id = "select-file"  />
          <Button></Button>
          <div></div>
        </div>
        <div className='dicomViewport'>
        <div ref = {ref => {this.dicomImg = ref}} id="dicom-img" onClick = {this.clickHandler} >
        </div>

        </div>
        <div>
        </div>
      </section>
    );
  }
}

export default Viewer;
