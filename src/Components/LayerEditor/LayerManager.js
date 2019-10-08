import React,{Component} from 'react'
import axios from 'axios'
import './LayerEditor.scss'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import store from '../../store'

class LayerManager extends Component{

    constructor(props){
      super(props);
    this.state={
     
  
    }
  
    store.subscribe(()=>{
  
  
      this.setState({organ:store.getState().organ, Modality: store.getState().Modality, images: store.getState().Images})
      
    })
    }
    componentDidMount(){
  
    
      
      
    }
      
  
  
  
    render(){
        
            
           
          
        return (
  
       
        <div  >
         <h1>Layer Manager</h1>
        </div>
        
      )
    }
    }
  
  
  export default LayerManager;
  