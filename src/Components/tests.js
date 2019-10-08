import React,{Component} from 'react'
import axios from 'axios'
import Viewport from './Viewport.js'
import ViewportDisplay from './ViewportDisplay.js'
import PatientList from './PatientList/Patients.js'
import Button from 'react-bootstrap/Button';
import Menu from './LayerEditor/MenuTemplate.js'
import LayerManager from './LayerEditor/LayerManager.js'
import store from '../store'
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
  

  }

  store.subscribe(()=>{
    let img = store.getState().Images
    img = img.slice(-4)
    console.log('img : ', img);
    
    this.setState({organ:store.getState().organ, Modality: store.getState().Modality, images: img})
    
  })
  }
    



  render(){
      console.log('test',this.state.images);
      
      let {images} =this.state
      
     
      
      let list  = images.map((item, key)=>{
        let imageArray = item.img.map((item2, key)=>{
          
          
          return (
            <div key = {key} style = {{position: 'absolute', width:'100%', height:'100%', left:'0', top:'0', opacity: item2.op}}>
             
          <ViewportDisplay display = '1' link = {item2.id} />
          </div>
          )
          
          
        })
        return (
        <div key  = {key} style = {{ position: 'relative', left: '0', top: '0',display: 'inline-block',width: '50%', height:'50%' }}>
            {imageArray}
           
        </div>
        
        )
         
      })
        
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
        
        <PatientList patient  = 'Paciente Rata_539.4827566594263_1568912556160' user = 'admin' style = {{zIndex: 1,visibility: this.state.hidden,width: '25%', height: '100vh', position: 'absolute'}} />
        <div style = {{width: '100vw', height: '100vh', backgroundColor:'black', textAlign:'center'} }>{list}
         </div>
        
        </div>
          
    
      <Button onClick= {()=>{this.setState({array_de_ids:array})}}>hola este es un boton</Button>
      <Button onClick= {()=>{this.setState({array_de_ids:array2})}}>hola este es un boton</Button>
     
      </div>
      
    )
  }
  }


export default HttpExample;
