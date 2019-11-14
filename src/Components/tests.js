import React,{Component} from 'react'
import axios from 'axios'
import Viewport from './Viewport.js'
import ViewportDisplay from './ViewportDisplay.js'
import PatientList from './PatientList/Patients.js'
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';
import Menu from './LayerEditor/MenuTemplate.js'
import LayerManager from './LayerEditor/LayerManager.js'
import store from '../store'
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': '062e7186-1805-4396-b6a2-2dccc3764c89' //Get your API key from https://portal.api2pdf.com
}

let tdiv
let array2 = ['https://bucketdeprueba314.s3.us-east-2.amazonaws.com/Production/000924cf-0f8d-42bd-9158-1af53881a557_1565107882482.dcm','https://bucketdeprueba314.s3.us-east-2.amazonaws.com/Production/000924cf-0f8d-42bd-9158-1af53881a557_1565107882482.dcm','https://bucketdeprueba314.s3.us-east-2.amazonaws.com/Production/000924cf-0f8d-42bd-9158-1af53881a557_1565107882482.dcm']
let array = ['https://bucketdeprueba314.s3.us-east-2.amazonaws.com/Production/000924cf-0f8d-42bd-9158-1af53881a557_1565107882482.dcm','https://bucketdeprueba314.s3.us-east-2.amazonaws.com/Production/000924cf-0f8d-42bd-9158-1af53881a557_1565107882482.dcm','https://bucketdeprueba314.s3.us-east-2.amazonaws.com/Production/000924cf-0f8d-42bd-9158-1af53881a557_1565107882482.dcm','https://bucketdeprueba314.s3.us-east-2.amazonaws.com/Production/000fe35a-2649-43d4-b027-e67796d412e0_1565669926215.dcm']
class HttpExample extends Component{

  constructor(props){
    super(props);
  this.state={
    array_de_ids: [],
    hidden : 'hidden',
    open: '-10px',
    organ: '',
    images: [],
    scale: .5,
    prueba: 0,
    lastX:0,
    lastY:0,
    visibility: false,
    patient_id : this.props.match.params
    
  

  }
 
  
  this.mouseDown = this.mouseDown.bind(this)
  this.generatePDF = this.generatePDF.bind(this)
  this.mouseMove = this.mouseMove.bind(this)
  this.mouseWheel = this.mouseWheel.bind(this)
  this.mouseUp =this.mouseUp.bind(this)
  

  store.subscribe(()=>{
    let img = store.getState().Images
    img = img.slice(-4)
   
    this.setState({organ:store.getState().organ, Modality: store.getState().Modality, images: img})
    
  })
  }
  componentDidMount(){
    
  }
  generatePDF(e) {
    fetch('https://v2018.api2pdf.com/chrome/html', {
      method: 'post',
      headers: headers,
      body: JSON.stringify({html: '<html><head><title>Boson Innovations</title><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></head><body><script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script><p>hola soy monty</p><img src="https://picsum.photos/700/400?random" class="img-fluid" alt="Responsive image"></body></html>', inlinePdf: true, fileName: 'test.pdf' })
    }).then(res=>res.json())
      .then(
        res => {
          console.log(res);

          const url = window.URL.createObjectURL(new Blob([res.pdf]))
          console.log(url);
          window.open(res.pdf)
          const link = document.createElement('a');
link.href = res.pdf;
document.body.appendChild(link);
link.download= 'hola.pdf';
        } 
     
      
      );
  }
  mouseDown(e){
   try {
     
    let {images}= this.state
    let key = Number(e.path[3].attributes.name.value)
    let nImages = images
    let tempViewport = nImages[key].viewport
    let lastX = e.pageX;
    let lastY = e.pageY;
    
    
    let button = e.which
    tempViewport.reset = false
  

    
  
   
    this.setState({images: nImages, lastX: lastX, lastY: lastY})
    
    tdiv =document.getElementById(nImages[key].imgId)
    tdiv.addEventListener('mousemove', this.mouseMove)
    tdiv.addEventListener('mouseup', this.mouseUp)

   } catch (error) {
     
   }
   
  }
  mouseMove(e){
    try {
      
      let {images, lastX, lastY}= this.state
    let key  = Number(e.path[3].attributes.name.value)
    let nImages = images
    let tempViewport = nImages[key].viewport
    let deltaX = e.pageX -lastX
    let deltaY = e.pageY -lastY
    
    
    
   
    if(e.which ===3){

      tempViewport.translation.x += (deltaX / tempViewport.scale);
      tempViewport.translation.y += (deltaY / tempViewport.scale);


    }
    else if(e.which ===1){

      tempViewport.voi.windowWidth += (deltaX / tempViewport.scale);
      tempViewport.voi.windowCenter += (deltaY / tempViewport.scale);

    }
    
    nImages[key].viewport = tempViewport
    this.setState({images: nImages, lastX : e.pageX, lastY: e.pageY})
    
    
    



    } catch (error) {
      
    }
    
   
      
  }
  mouseUp(){
    tdiv.removeEventListener('mousemove', this.mouseMove)
    tdiv.removeEventListener('mouseup', this.mouseUp)
    
  }
mouseWheel(e){
  try {
    let {images} = this.state
  let key  = Number(e.path[3].attributes.name.value)
  let nImages = images
  let tempViewport = nImages[key].viewport

  if(Number(e.wheelDelta)<0 ){
    tempViewport.scale -=.25
    this.setState({images: nImages})
  }
  else {
    tempViewport.scale += .25
    this.setState({images: nImages})

  }
 
  } catch (error) {
    
  }
  
  
}


  render(){
   
      let {images} =this.state
      let nImages = images
      let self = this
      
      let list  = images.map((item, key)=>{
        const div = document.getElementById(item.imgId)
        if (div!=null){
          const self  = this

          div.addEventListener('mousedown', this.mouseDown)
          const mouseWheelEvents = ['mousewheel', 'DOMMouseScroll']
          mouseWheelEvents.forEach(function(eventType){

            div.addEventListener(eventType, self.mouseWheel)
          })

        }
         
      
        
        
        let imageArray = item.img.map((item2, key2)=>{
          
          
          return (

            <div key = {key2} style = {{position: 'absolute', width:'100%', height:'100%', left:'0', top:'0', opacity: item2.op}} onMouseOver = {()=>{
              this.setState({visibility: true})
              let body = document.getElementsByTagName('body')
              
              body[0].style.overflow = 'hidden'
              

            
            }} onMouseLeave = {()=>{
              this.setState({visibility : false})
              let body = document.getElementsByTagName('body')
              
              body[0].style.overflow = 'scroll'
            }}>
             
          <ViewportDisplay reference = {images} key1 ={key} key2 = {key2} viewport = {item.viewport} prueba = {this.state.prueba} display = '1' link = {[item2.id]} />
            <Fade in = { this.state.visibility}>

            <div style = {{borderBottom: 'solid 3px #70C5FF',borderRight:'solid 3px #70C5FF',borderLeft: 'solid 3px #70C5FF',position : 'absolute', width : '100%', height: '10%', backgroundColor : 'blue',left: 0, bottom: '0px'}}>
              
              <div style = {{width: '10%', height: '100%' , display: 'inline-block'}}> <Button style = {{width: '100%', height: '100%'}}> h1</Button></div>
              <div style = {{width: '10%', height: '100%' , display: 'inline-block'}}> <Button style = {{width: '100%', height: '100%'}}> h1</Button></div>
              <div style = {{width: '10%', height: '100%' , display: 'inline-block'}}> <Button style = {{width: '100%', height: '100%'}}> h1</Button></div>
              <div style = {{width: '10%', height: '100%' , display: 'inline-block'}}> <Button style = {{width: '100%', height: '100%'}}> h1</Button></div>
              <div style = {{width: '10%', height: '100%' , display: 'inline-block'}}> <Button style = {{width: '100%', height: '100%'}}> h1</Button></div>
              <div style = {{width: '10%', height: '100%' , display: 'inline-block'}}> <Button style = {{width: '100%', height: '100%'}}> h1</Button></div>
              <div style = {{width: '10%', height: '100%' , display: 'inline-block'}}> <Button style = {{width: '100%', height: '100%'}}> h1</Button></div>
              <div style = {{width: '10%', height: '100%' , display: 'inline-block'}}> <Button style = {{width: '100%', height: '100%'}}> h1</Button></div>
              <div style = {{width: '10%', height: '100%' , display: 'inline-block'}}> <Button style = {{width: '100%', height: '100%'}}> h1</Button></div>
              <div style = {{width: '10%', height: '100%' , display: 'inline-block'}}> <Button style = {{width: '100%', height: '100%'}}> h1</Button></div>
              
             
            </div>
            </Fade>
          
          </div>
          )
          
          
        })
        return (
        <div id = {item.imgId} name = {key} key  = {key} style = {{ position: 'relative', left: '0', top: '0',display: 'inline-block',width: '50%', height:'50%' }}>
            {imageArray}
           
        </div>
        
        )
         
      })
      if (this.props.match.params.key =='admin'){
        return (

     
          <div>
          
          <div onClick = {()=>{
            if (this.state.hidden === 'hidden'){
    
              this.setState({hidden: 'visible', open : '24.6%'})
            }
            else{
              this.setState({hidden: 'hidden', open: '-0.4%'})
            }
          }}style = {{ zIndex: 1,cursor: 'pointer',position:'absolute', width: '30px', height: '70px', backgroundColor:'red',left:this.state.open, borderRadius: '20px', border: 'solid blue 5px'}}></div>
            <div style = {{display: 'block', width: '100%'}}>
            
            <PatientList patient  = {this.props.match.params.param} user = 'admin' style = {{zIndex: 1,visibility: this.state.hidden,width: '25%', height: '100vh', position: 'absolute'}} />
            <div style = {{width: '100vw', height: '100vh', backgroundColor:'black', textAlign:'center'} }>{list}
             </div>
            
            </div>
              
        
          <Button onClick = {this.generatePDF}>generatePDF</Button>
          </div>
          
        )
        

      }
      else {
        return (

          <h1>Auth Error</h1>
        )
      }  
      
  }
  }


export default HttpExample;
