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
      Images: []

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
    
    
    
  }
  componentDidUpdate(prev_props, prev_state){

  
    

  }
  componentDidMount(){

    //Enables HTML5 element to use cornerstone
    
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
