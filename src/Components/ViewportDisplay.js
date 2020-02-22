import React, { Component } from 'react';
import '../scss/App.scss';
import Loading from 'react-loading-components';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';
import PropTypes from 'prop-types'
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import store from '../store' 

import { isAbsolute } from 'upath';
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneWADOImageLoader.configure({
  useWebWorkers: true,
});

//Add cornerstoneWADOImageLoaderCodecs.min and cornerstoneWADOImageLoaderWebWorker.min from 
//cornerstone-wado-image-loader to ImageLoaderScripts in public folder

let element;
let link = ''
class ViewportDisplay extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      imgData: '',
      imgRawData: '',
      loading : '',
      unloaded: '',
      slink : this.props.link,
      dimensions: {},
      viewport : {},
      enable: false,
      Images: [],
      segmented: this.props.segmented

    }

    //Reacts dicom-img element reference to load image
    store.subscribe(()=>{
      
      let img = store.getState().Images
      
      this.setState({viewport: store.getState().viewport, Images: store.getState().Images})
     
      
    })
    this.dicomImg = null;
  
  }
  componentWillReceiveProps(next_props) {
    try {
      const viewport = cornerstone.getViewport(this.dicomImg)
    if (viewport != null){
      
        
    viewport.scale = next_props.viewport.scale
    viewport.translation.x = next_props.viewport.translation.x
    viewport.translation.y = next_props.viewport.translation.y
    viewport.voi.windowWidth =next_props.viewport.voi.windowWidth
    viewport.voi.windowCenter =next_props.viewport.voi.windowCenter
    cornerstone.setViewport(this.dicomImg, viewport)
    
    
    if (next_props.viewport.reset){
      cornerstone.reset(this.dicomImg)
    }
  }
    } catch (error) {
      
    }
      this.setState({segmented: next_props.segmented})
    
    
  }
  componentDidUpdate(prev_props, prev_state){

  
    

  }
  componentDidMount(){

    //Enables HTML5 element to use cornerstone
    element= this.dicomImg
    let self = this
    function onImageRendered(e) {



      console.log('rendered');

      const eventData = e.detail;

      // set the canvas context to the image coordinate system
      cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, eventData.canvasContext);

      // NOTE: The coordinate system of the canvas is in image pixel space.  Drawing
      // to location 0,0 will be the top left of the image and rows,columns is the bottom
      // right.

      let image = eventData.image
      let w = image.columns
      let h = image.rows
      const ctx = eventData.canvasContext;
      let index;
      //console.log(context);
      let pixelsCanvas= ctx.getImageData(0,0,w, h);
      let data = pixelsCanvas.data

      let sum ;
      let max = image.maxPixelValue;
      let min = image.minPixelValue;
      let pratio = (max -min)/255;
      let pmax = 160 * pratio;
      let pmin = 120 * pratio;
      let pmax2 = 180 * pratio;
      let pmin2 = 161 * pratio;
      let pmax3 = 230 * pratio;
      let pmin3 = 181 * pratio;
      let pmax4 = 255 * pratio;
      let pmin4 = 231 * pratio;
      let pmax5 = 159 * pratio;
      let pmin5 = 110 * pratio;
      let pmax6 = 109 * pratio;
      let pmin6 = 80 * pratio;
      let pmax7 = 79 * pratio;
      let pmin7 = 50 * pratio;
      let pmax8 =  49* pratio;
      let pmin8 = 20 * pratio;
      let pmax9=  19* pratio;
      let pmin9 =  0* pratio;






      // console.log(pixelsCanvas);
      // console.log(w,h);
      // console.log(w*h*4);

      function getOT(){
        for (let i = 0 ; i< data.length; i += 4){



          if(true){
            data [i] = 255
            data [i+1]=0
            data[i+2]=0
          }
        }
      }
      console.log("segmented",self.state)
      if (self.state.segmented){
       
      segment();
      }

      function segment(){

        for (let i = 0 ; i< data.length; i += 4){
              sum =  (data[i] + data[i+1] + data[i+2])/3

             if (sum < pmax && sum >pmin){

               data[i]     = 255   // red
               data[i + 1] = 0 // green
               data[i + 2] = 0// blue



             }
             if (sum < pmax2 && sum >pmin2){

               data[i]     = 0   // red
               data[i + 1] = 255 // green
               data[i + 2] = 0// blue



             }
             if (sum < pmax3 && sum >pmin3){

               data[i]     = 0   // red
               data[i + 1] = 0 // green
               data[i + 2] = 255// blue



             }
             if (sum < pmax3 && sum >pmin3){

               data[i]     = 80   // red
               data[i + 1] = 0 // green
               data[i + 2] = 255// blue



             }
             if (sum < pmax3 && sum >pmin3){

               data[i]     = 0   // red
               data[i + 1] = 0 // green
               data[i + 2] = 255// blue



             }
             if (sum < pmax4 && sum >pmin4){

               data[i]     = 80   // red
               data[i + 1] = 0 // green
               data[i + 2] = 255// blue



             }

             if (sum < pmax5 && sum >pmin5){

               data[i]     = 0   // red
               data[i + 1] = 200 // green
               data[i + 2] = 100// blue



             }
             if (sum < pmax6 && sum >pmin6){

               data[i]     = 80   // red
               data[i + 1] = 50 // green
               data[i + 2] = 255// blue



             }

             if (sum < pmax7 && sum >pmin7){

               data[i]     = 60   // red
               data[i + 1] = 200 // green
               data[i + 2] = 100// blue



             }
             if (sum < pmax8 && sum >pmin8){

               data[i]     = 100  // red
               data[i + 1] = 100 // green
               data[i + 2] = 200// blue



             }
             if (sum < pmax9 && sum >pmin9){

               data[i]     = 80  // red
               data[i + 1] = 200 // green
               data[i + 2] = 20// blue



             }


        }

        ctx.putImageData(pixelsCanvas, 0, 0);


      }

      // document.getElementById('topright').textContent = "Render Time:" + eventData.renderTimeInMs + " ms";
      // document.getElementById('bottomleft').textContent = "WW/WL:" + Math.round(eventData.viewport.voi.windowWidth) + "/" + Math.round(eventData.viewport.voi.windowCenter);
      // document.getElementById('bottomright').textContent = "Zoom:" + eventData.viewport.scale.toFixed(2);
  }
  element.addEventListener('cornerstoneimagerendered', onImageRendered);

  
    switch (this.props.display) {
        case '1':
            
            this.setState({dimensions:{width:'100%', height: '100%'}})
            break;
        case '2':
                this.setState({dimensions:{width:'50%', height: '100%'}})
            break;
            case '3':
                this.setState({dimensions:{width:'50%', height: '50%'}})
            break;
            case '4':
                this.setState({dimensions:{width:'50%', height: '50%'}})
            break;
            case '5':
                this.setState({dimensions:{width:'100%', height: '100%'}})
            break;
        default:
               
            break;
    }
    
    
    if (this.props.link != null){

       
        
        link =this.state.slink

    }
  
    cornerstone.enable(this.dicomImg)
    element = this.dicomImg
    
   
    //let link = 'https://bucketdeprueba314.s3.us-east-2.amazonaws.com/Production/000924cf-0f8d-42bd-9158-1af53881a557_1565107882482.dcm'
    let wadouri = 'wadouri:'+ link
    
    this.dicomWebViewer(wadouri, element);
  
      
      
    this.setState({enable: true})


  }

  dicomWebViewer = (imgId, elements)=>{


    //Loads image
    
    
    cornerstone.loadAndCacheImage(imgId).then((image)=>{
      //Displays image
      cornerstone.displayImage(elements, image)
      
      const viewport  = cornerstone.getViewport(elements)
      let reference = this.props.reference
      reference[this.props.key1].viewport = viewport
    
      
      store.dispatch({type: 'set_Image', Images: reference})
       
       console.log(image, "viewport", viewport)
      this.setState({
        imgData: image,
        imgRawData: image.data,
       
      },()=>{
          let { imgData, imgRawData, Images } = this.state
        // imgData only contains certain data, look at the object in 
        // console.log(img.Data) to view properties E.g.
       
       
        
        
       

        // imgRawData contains all the infromation. For usage, you
        // need to use th specific code. E.g. with Int value
         
      })
    })
  }


  render() {
   
    return (
       
       
        <div   ref = {ref => {this.dicomImg = ref}} style ={{width: '100%', height:'100%', border : 'solid 3px #70C5FF'}}  >           
        </div>

    );
  }
}
ViewportDisplay.propTypes = {

  style : PropTypes.object,
  display: PropTypes.string,

}

export default ViewportDisplay;
