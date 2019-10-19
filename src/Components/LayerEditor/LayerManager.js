import React,{Component} from 'react'
import axios from 'axios'
import './LayerEditor.scss'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import store from '../../store'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 20,
    label: '20%',
  },
  {
    value: 40,
    label: '40%',
  },
  {
    value: 60,
    label: '60%',
  },
  {
    value: 80,
    label: '80%',
  },
  {
    value: 100,
    label: '100°C',
  },
];
class LayerManager extends Component{

    constructor(props){
      super(props);
    this.state={
     images : [],
     dropVisible: 'hidden'
  
    }
  
    store.subscribe(()=>{
  
  
      this.setState({organ:store.getState().organ, Modality: store.getState().Modality, images: store.getState().Images})
      
    })
    }
    componentDidMount(){
  
    
      
      
    }
      
  
  
  
    render(){
      
        let {images} = this.state
     
     
    let NewImages = images
   
     
      let list  = images.map((item, key)=>{
        let imageArray = item.img.map((item2, key2)=>{
          
          
          
          return (
            <div key = {key2} style = {{width: '100%', height: '100%', paddingLeft: '5%'}}>
                
                <div style = {{display: 'inline-block'}}><p>Image {key2} : {item2.name}</p></div><div style ={{ marginLeft : '20px',alignItems: 'right',display: 'inline-block'}}><Button onClick ={()=>{

let filter =NewImages[key].img.filter(function (value, index, arr){
  return value.name == item2.name

})
console.log(filter, NewImages);
this.setState({images: filter})
store.dispatch({type: 'set_Image', Images: NewImages})


                }}>Delete</Button></div>
                <div style = {{textAlign: 'center'}}><Slider defaultValue = {50} valueLabelDisplay = 'on' marks = {marks} onChangeCommitted = {(evt, value)=>{
                        NewImages[key].img[key2].op = value/100;
                     
                        this.setState({images: NewImages})
                        store.dispatch({type: 'set_Image', Images: this.state.images})
                }} onChange = {(evt, value)=>{
                
                  
                  
                }}style = {{width:'80%'}} type = 'range' min= {0} max = {100}></Slider></div>
        
          </div>
          )
          
          
        })
        return (
          <div >
        <div key = {key} style = {{width: '100%', height: '10%'}} onDragOver= {(e)=> {console.log(e);}     }  onDrop = {(e)=>{ console.log('onDrop', e);
        }}>
          <div style = {{width: '70%', height:'50%', marginBottom: 0, display: 'inline-block'}}><p >Image {key}</p></div>
          <div style = {{width: '30%', height: '50%', display: 'inline-block'}}><Button onClick = {()=>{
              
                NewImages[key].img.push({name: '000924cf-0f8d-42bd-9158-1af53881a557_1565107882482.dcm', id: 'https://bucketdeprueba314.s3.us-east-2.amazonaws.com/Production/000924cf-0f8d-42bd-9158-1af53881a557_1565107882482.dcm', op: 1})
                this.setState({images: NewImages})
                store.dispatch({type: 'set_Image', Images: this.state.images})
                
          }}>Add</Button></div>
        
        </div>
        
        <div style = {{ width:'100%', height: '30%'}}>{imageArray}
        
        </div>
        <div id = {key } onDrop = {(e)=>{
              const div = document.getElementById(key)
              const dropper = document.getElementById('dropper')
              var data = e.dataTransfer.getData('obj');
              data = JSON.parse(data)
              console.log('id: ',data, NewImages[key].img);
              let newTemp = NewImages[key].img
              newTemp.push(data)
              console.log(newTemp);
              NewImages[key].img = newTemp
              this.setState({images: NewImages})
              store.dispatch({type: 'set_Image', Images: this.state.images})
              
            


        }}
        onDragLeave = {(e)=>{
          const div = document.getElementById(key)
          const dropper = document.getElementById('dropper')
          
          
        }}
        onDragOver = {(e)=>{
          const div = document.getElementById(key)
          const dropper = document.getElementById('dropper')

          e.preventDefault()
          
         
         
        }} style = {{ marginTop: '10px',width: '100%', height: '100px', textAlign : 'center' }}>
          <div id  = 'dropper'style = {{visibility: 'hidden'}}> Add Image</div>
         
        </div>
        
        
        </div>
            
           
   
        
        )
         
      })
          
        return (
  
       
       
        <div id = 'dropzone'   style = {{padding : '10px',width: '100%', height: '100%' }} onDrop = {(e)=>{
        
          
     

        }}
        onDragLeave = {(e)=>{
       
          
        }} onDragOver = {(e)=>{
            

              
              
        }} >
         <h1>Images</h1>
         <div style= {{width: '100%', height: '100%',}}> {list}</div>
         
        </div>
        
      )
    }
    }
  
  
  export default LayerManager;
  