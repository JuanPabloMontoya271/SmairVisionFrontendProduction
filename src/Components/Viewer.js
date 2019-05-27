import React, { Component } from 'react';
import * as nj from 'numjs'
import '../scss/App.scss';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';
import * as cornerstoneTools from 'cornerstone-tools'
import colormap from 'colormap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import set from './icons/set.png'
import axios from 'axios'
import Display from './Plot'
import Plot from 'react-plotly.js';
import flip from './icons/flip.png'
import icon from './icons/icon2.png'
import zoom from './icons/zoom.png'
import refresh from './icons/refresh.png'
import zoomout from './icons/zoomout.png'
import rotate90 from './icons/rotate90.png'
import rotateback from './icons/rotateback.png'
let selection = true;
let boleano = false;
let mousex;
let mousey:
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
function displayCanvasImage(array, colorscale, w, h){


  let colors  = colormap({

      colormap:colorscale,
      nshades :10,
      format: 'rgb',
      alpha:1

  })
  var c = document.getElementById("Canvas");
  var ctx = c.getContext("2d");
  var data = ctx.createImageData(w, h);
  var i;
  for (i = 0; i <w*h; i +=4) {
      data.data[i+0]= colors[array[i]][0]
      data.data[i+1] = colors[array[i]][1]
      data.data[i+2]=colors[array[i]][2]
      data.data[i+3]=255
  }
  ctx.putImageData(data,0,0);


  console.log('displayed');


}
class Viewer extends Component {

  constructor(props){
    super(props);
    this.state = {
      imgData: '',
      imgRawData: '',
      styles: {display:'none'},
      bol: true,
      selection: false,
      idArray:[],
      negative:'',
      positive :'',
      plt:'',
      pplt :''

    }

    //console.log({name});
    //Reacts dicom-img element reference to load image
    this.dicomImg = null;
    this.clickHandler = this.clickHandler.bind(this)
    this.post = this.post.bind(this)
    this.cluster  = this.cluster.bind(this)
    this.segment = this.segment.bind(this)


  }
segment(){
      if (!this.state.segment){

            this.setState({segment:true})


      }
      else {
        this.setState({segment:false})
      }



}
clickHandler(){
console.log('clicked');

}
cluster(){

let { imgData, imgRawData, pixelData, pixels} = this.state

try {
  let columns = imgData.columns
  let rows = imgData.rows
  let pArray = Array.from(pixelData)
  document.getElementById('coords').textContent = document.getElementById('coords').textContent + '  Running Clusters'
   axios.post('http://127.0.0.1:8000/kmeans/', {array:pArray, w: columns,h:rows }).then((res)=>{
     document.getElementById('coords').textContent = 'Done'
     let resultados =res
     let counts =resultados.data[0].counts;
     let unique =resultados.data[0].unique;
     let punique = resultados.data[0].punique;
     let pcounts =resultados.data[0].pcounts;
     console.log(res);
     let clustered = resultados.data[0]['cluster labels'];
     const plt = (<Plot className='plot' id = 'plt'
        data={[
          {
            x: unique,
            y: counts,
            type: 'scatter',

            marker: {color: 'green'},
          }
        ]}
        layout={{title: 'Original Image'}}
      />)

      const pplt =(<Plot className = 'plot' id ='pplt'
         data={[
           {
             x: punique,
             y: pcounts,
             type: 'scatter',

             marker: {color: 'blue'},
           }
         ]}
         layout={{ title: 'Clustered'}}


       />)
    this.setState({plt: plt, pplt : pplt})

  })

} catch (e) {

}

}
post(){
  let { imgData, imgRawData, pixelData, pixels} = this.state
try {
  let columns = imgData.columns
  let rows = imgData.rows
  let pArray = Array.from(pixelData)
  document.getElementById('coords').textContent = document.getElementById('coords').textContent + '  Running Analysis'
   axios.post('https://herokudjangoapp314.herokuapp.com/model60/', {array:pArray, w: columns,h:rows }).then((res)=>{
     document.getElementById('coords').textContent = 'Done'
     let resultados =res.data[0].content['response body'].outputs.score
    console.log(res.data[0].content['response body'].outputs.score);
    this.setState({results:resultados, positive: resultados.floatVal[1], negative: resultados.floatVal[0] })

  })
} catch (e) {

}



}
  componentDidMount(){


    //Enables HTML5 element to use cornerstone
      let { imgData, imgRawData, pixelData, pixels, segment} = this.state
    cornerstone.enable(this.dicomImg)
    const element =this.dicomImg
    document.getElementById('select-file').addEventListener('change',(e)=>{
      //Extracts only one file from selected files
      const file = e.target.files[0];
      //Obtain specific format dicom image id
      //const file2 ='https://s3.us-east-2.amazonaws.com/bucketdeprueba314/IM-0001-0001.dcm'


      const imgId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

      this.dicomWebViewer(imgId);
      console.log(imgId);
    })

    document.getElementById('zoomIn').addEventListener('click', function (e) {
      try {
        const viewport = cornerstone.getViewport(element);
        viewport.scale += 0.25;
        cornerstone.setViewport(element, viewport);

      } catch (e) {
        console.log(e);
      }
    });

    document.getElementById('zoomOut').addEventListener('click', function (e) {
      try {
        const viewport = cornerstone.getViewport(element);
        viewport.scale -= 0.25;
        cornerstone.setViewport(element, viewport);

      } catch (e) {
        console.log(e);
      }
    });
    document.getElementById('reset').addEventListener('click', function (e) {


      try {
        cornerstone.reset(element);
      } catch (e) {
        console.log(e);
      }

   });

   element.addEventListener('mousedown', function (e) {
  let lastX = e.pageX;
  let lastY = e.pageY;
  const mouseButton =e.which
  function mouseMoveHandler(e) {
    const deltaX = e.pageX - lastX;
    const deltaY = e.pageY - lastY;
    lastX = e.pageX;
    lastY = e.pageY;

    const viewport = cornerstone.getViewport(element);
    if (mouseButton ===1) {
      let viewport = cornerstone.getViewport(element);
           viewport.voi.windowWidth += (deltaX / viewport.scale);
           viewport.voi.windowCenter += (deltaY / viewport.scale);
           cornerstone.setViewport(element, viewport);
    }else if (mouseButton===3|| mouseButton ===2){

      viewport.translation.x += (deltaX / viewport.scale);
      viewport.translation.y += (deltaY / viewport.scale);
      cornerstone.setViewport(element, viewport);

    }

  }
  function mouseUpHandler() {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  }
  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);


});


const mouseWheelEvents = ['mousewheel', 'DOMMouseScroll'];
    mouseWheelEvents.forEach(function(eventType) {
      element.addEventListener(eventType, function (e) {
        // Firefox e.detail > 0 scroll back, < 0 scroll forward
        // chrome/safari e.wheelDelta < 0 scroll back, > 0 scroll forward
        try {
          let viewport = cornerstone.getViewport(element);
          if (e.wheelDelta < 0 || e.detail > 0) {
            viewport.scale -= 0.25;
          } else {
            viewport.scale += 0.25;
          }
          cornerstone.setViewport(element, viewport);
          // Prevent page from scrolling
          return false;
        } catch (e) {
          console.log(e);
        }

      });
    });

    document.getElementById('hFlip').addEventListener('click', function (e) {
            const viewport = cornerstone.getViewport(element);
            viewport.hflip = !viewport.hflip;
            cornerstone.setViewport(element, viewport);
        });

        document.getElementById('vFlip').addEventListener('click', function (e) {
       const viewport = cornerstone.getViewport(element);
       viewport.vflip = !viewport.vflip;
       cornerstone.setViewport(element, viewport);
   });


    document.getElementById('lRotate').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.rotation-=90;
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('rRotate').addEventListener('click', function (e) {
           const viewport = cornerstone.getViewport(element);
           viewport.rotation+=90;
           cornerstone.setViewport(element, viewport);
       });


       element.addEventListener('mousemove', function(event) {
         if (boleano){

           const pixelCoords = cornerstone.pageToPixel(element, event.pageX, event.pageY);

          mousex = pixelCoords.x
          mousey = pixelCoords.y
         document.getElementById('coords').textContent = "(x: " + Math.floor(pixelCoords.x ) + ") (y: " + Math.floor(pixelCoords.y) + " )"}

    });



    function onImageRendered(e) {





      const eventData = e.detail;
      console.log(eventData);
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
      console.log(image.maxPixelValue);
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





      console.log(pmax, pmin);
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
      segment();

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
        console.log(sum);
        ctx.putImageData(pixelsCanvas, 0, 0);


      }

      // document.getElementById('topright').textContent = "Render Time:" + eventData.renderTimeInMs + " ms";
      // document.getElementById('bottomleft').textContent = "WW/WL:" + Math.round(eventData.viewport.voi.windowWidth) + "/" + Math.round(eventData.viewport.voi.windowCenter);
      // document.getElementById('bottomright').textContent = "Zoom:" + eventData.viewport.scale.toFixed(2);
  }
  element.addEventListener('cornerstoneimagerendered', onImageRendered);

  }



  dicomWebViewer = (imgId)=>{
    //Loads image
    let {idArray}= this.state

    let nArray =idArray.push({id:imgId, name: '', visible: 'visible'}  )
    cornerstone.loadImage(imgId).then((image)=>{
      //Displays image
      console.log(image);

      cornerstone.displayImage(this.dicomImg, image)
      boleano =true



      this.setState({
        imgData: image,
        imgRawData: image.data,
        pixelData :image.getPixelData(),
        idArray: idArray,
        columns:image.columns,
        rows: image.rows,



      },()=>{

          let { imgData, imgRawData, pixelData, pixels} = this.state
        // imgData only contains certain data, look at the object in
        // console.log(img.Data) to view properties E.
        console.log(imgData.data.elements);
        const viewport = cornerstone.getViewport(this.dicomImg)
        console.log("Viewport",viewport)
        cornerstone.resize(this.dicomImg)
        let w = this.dicomImg.clientWidth
        let h= this.dicomImg.clientHeight
        let columns = imgData.columns
        let rows = imgData.rows
        let s =(w/h)/(columns/rows)
        let array = Array.from(pixelData)
        viewport.scale =s
        cornerstone.setViewport(this.dicomImg, viewport)


        console.log(viewport.scale)
        this.setState({plt: '', pplt: ''})


        // imgRawData contains all the infromation. For usage, you
        // need to use th specific code. E.g. with Int value


          //var dimensions = [ array.length, array[0].length ];


          //Math.reshape(array, [imgData.rows, imgData.cols]);




      })



    })

  }



  render() {

    let {idArray, results, positive, negative, plt, pplt} = this.state


    let list = idArray.map((item, key) =>{

      return (
        <ListGroup.Item key = {key}>

        {item.id}{item.name}
              <Button key = {key} className= 'botones' style = {{visibility:'visible' }} onClick = {()=>{cornerstone.loadImage(item.id).then((image)=>{


                cornerstone.displayImage(this.dicomImg, image)

                this.setState({
                  imgData: image,
                  imgRawData: image.data,
                  pixelData :image.getPixelData(),
                  idArray: idArray



                },()=>{

                    let { imgData, imgRawData, pixelData, pixels} = this.state
                  // imgData only contains certain data, look at the object in
                  // console.log(img.Data) to view properties E.
                  console.log(imgData.data.elements);
                  const viewport = cornerstone.getViewport(this.dicomImg)
                  console.log("Viewport",viewport)
                  cornerstone.resize(this.dicomImg)
                  let w = this.dicomImg.clientWidth
                  let h= this.dicomImg.clientHeight
                  let columns = imgData.columns
                  let rows = imgData.rows
                  let s =(w/h)/(columns/rows)
                  let array = Array.from(pixelData)
                  viewport.scale =s
                  cornerstone.setViewport(this.dicomImg, viewport)
                  cornerstone.reset(this.dicomImg)

                  console.log(viewport.scale)



                  // imgRawData contains all the infromation. For usage, you
                  // need to use th specific code. E.g. with Int value


                    //var dimensions = [ array.length, array[0].length ];


                    //Math.reshape(array, [imgData.rows, imgData.cols]);




                })



              })}} >open</Button>
        </ListGroup.Item>
      )
    })

    return (
      <div>
      <section id = "dicom-web-viewer">
        <div className = "select-file-holder">
        <Card className = 'Browser'>
        <Card.Header><div id ='uploader'>Import files {this.props.mname}<img src={icon} alt = 'icon' className='icon'/>
<input type = "file" id = "select-file" /></div></Card.Header>
          <Card.Body>
          <ListGroup></ListGroup>
          {list}
          </Card.Body>
          </Card>
          <div></div>
        </div>
        <div className='dicomViewport' >

        <div ref = {ref => {this.dicomImg = ref}} id="dicom-img" onClick = {this.clickHandler} >

        </div>
  
        <div id = 'pcontainer'>
        {plt}
        {pplt}
        </div>

        </div>
        <div>
          <Card className = 'Toolbar'>
          <Card.Header>Toolbar</Card.Header>
        <Button className="Tools" id ='reset'><img src = {refresh} alt ='Reset'/></Button>
        <Button className="Tools" id="zoomIn"><img src = {zoom} alt ='Zoom In'/></Button>
        <Button className="Tools" id ='zoomOut'><img src = {zoomout} alt ='Zoom Out'/></Button>

        <Button className="Tools" id = 'hFlip'><img src = {flip} alt ='flipt'/></Button>
        <Button className="Tools" id = 'vFlip'><img src = {flip} alt ='flip'/></Button>
        <Button className="Tools" id = 'lRotate'><img src = {rotate90} alt ='rotate90'/></Button>
        <Button className="Tools" id = 'rRotate'><img src = {rotateback} alt ='rotate back'/></Button>

        <Button className="Tools" id = 'Analyze' onClick ={this.cluster} style = {{opacity:1}}>Run Clustering</Button>
        <Button className="Tools" id = 'Segment' onClick ={this.segment} style = {{opacity:1}}>Run Clustering</Button>
        <Button className="Tools" id = 'Analyze' onClick ={this.post} style = {{opacity:1}}>Run Analysis</Button>

        <Card.Header className ='stats'>Stats</Card.Header>
        <div><span id="coords"></span></div>
        </Card>
        </div>


      </section>
      <div>
      <Card className = 'Console'>
          <Card.Header>Results</Card.Header>
          <Card.Body><li>Negative: {negative}</li><br/><li> Positive: {positive}</li></Card.Body>
      </Card>
      </div>

      </div>
    );
  }
}

export default Viewer;
        // <canvas id = 'Canvas' onClick = {this.clickCanvas} className ='Displayed_Canvas'></canvas>
