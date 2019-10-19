import React, { Component } from 'react';
import '../scss/App.scss';
import Loading from 'react-loading-components';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';
import PropTypes from 'prop-types'
import { isAbsolute } from 'upath';
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser
cornerstoneWADOImageLoader.configure({
  useWebWorkers: true,
});

//Add cornerstoneWADOImageLoaderCodecs.min and cornerstoneWADOImageLoaderWebWorker.min from 
//cornerstone-wado-image-loader to ImageLoaderScripts in public folder


class Thumbnail extends Component {

  constructor(props){
    super(props);

    this.state = {
      imgData: '',
      imgRawData: '',
      loading : '',
      unloaded: '',
      slink : this.props.link

    }
    //Reacts dicom-img element reference to load image
    this.dicomImg = null;
  }

  componentDidMount(){
    //Enables HTML5 element to use cornerstone
    let link = ''
    
    if (this.props.link != null){

        link =this.state.slink

    }
  
    cornerstone.enable(this.dicomImg)
    //let link = 'https://bucketdeprueba314.s3.us-east-2.amazonaws.com/Production/000924cf-0f8d-42bd-9158-1af53881a557_1565107882482.dcm'
    let wadouri = 'wadouri:'+ link
    
    this.dicomWebViewer(wadouri);
    
    


  }

  dicomWebViewer = (imgId)=>{


    //Loads image
    this.setState({loading:'loadingClass', unloaded:'noDisplay'})
    cornerstone.loadAndCacheImage(imgId).then((image)=>{
      //Displays image
      cornerstone.displayImage(this.dicomImg, image)
      
      this.setState({
        imgData: image,
        imgRawData: image.data,
        loading: 'loadedClass',
        unloaded: 'DisplayClass'
      },()=>{
          let { imgData, imgRawData } = this.state
        // imgData only contains certain data, look at the object in 
        // console.log(img.Data) to view properties E.g.
    

        // imgRawData contains all the infromation. For usage, you
        // need to use th specific code. E.g. with Int value
      

      })
    })
  }


  render() {
    return (
        <div style ={this.props.style}>
       
        <div   ref = {ref => {this.dicomImg = ref}}  className = {this.state.unloaded}>
          
         
     
            </div>
            <div className = {this.state.loading}>
            <Loading  type='oval' width={'50%'} height={'70%'} fill='#70C5FF' />
            </div>
   
      </div>

    );
  }
}
Thumbnail.propTypes = {

  style : PropTypes.object,
  thumbnailStyle: PropTypes.object
}

export default Thumbnail;
