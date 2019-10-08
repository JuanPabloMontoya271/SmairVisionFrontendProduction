import React,{Component} from 'react'
import axios from 'axios'
import './LayerEditor.scss'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import store from '../../store'
class Menu extends Component{

  constructor(props){
    super(props);
  this.state={
   

  }

  store.subscribe(()=>{


    this.setState({organ:store.getState().organ, Modality: store.getState().Modality, images: store.getState().Images})
    
  })
  }
  componentDidMount(){

    const ed = document.getElementById(this.props.ids)
    let isResizing = false
    ed.addEventListener('mousedown', (e)=>{

        if (!isResizing){
        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
        let prevX = e.clientX;
        let prevY = e.clientY;
        function mouseMove(e){
                let newX = prevX- e.clientX
                let newY = prevY - e.clientY
                let rect = ed.getBoundingClientRect()
                ed.style.left = rect.left -newX + "px"
                ed.style.top = rect.top -newY + "px"
                prevX = e.clientX;
                prevY = e.clientY;
        }
        function mouseUp(){
                window.removeEventListener('mousemove', mouseMove)
                window.removeEventListener('mouseup', mouseUp)

        }

    }})
    const resizers = document.querySelectorAll('.resizer')
    let currentResizer;
    for (let resizer of resizers){


        resizer.addEventListener('mousedown', mousedown)
        const maxH = 300;
        const maxW = 200;
        ed.style.width = maxW + 'px'
        ed.style.height = maxH + 'px'
        function mousedown(e){
            isResizing = true
            currentResizer  =e.target
            let prevX = e.clientX;
            let prevY = e.clientY;
            let minWidth = 100
            window.addEventListener('mousemove', mousemove)
            window.addEventListener('mouseup', mouseup)
            function mousemove (e){
                
                    const rect = ed.getBoundingClientRect();
                    var width = parseInt(ed.style.width,10)
                    var height = parseInt(ed.style.height,10)
                    
                    
                    if(width >=maxW ){
                        if (height >=maxH){
                    if (currentResizer.classList.contains('se')){

                        ed.style.width = rect.width - (prevX- e.clientX) + 'px';

                        ed.style.height = rect.height - (prevY - e.clientY) + 'px';
                    }
                    else if (currentResizer.classList.contains('sw')){

                        ed.style.width = rect.width + (prevX- e.clientX) + 'px';

                        ed.style.height = rect.height - (prevY - e.clientY) + 'px';

                        ed.style.left = rect.left - (prevX - e.clientX) + 'px'
                    }
                    else if (currentResizer.classList.contains('nw')){

                        ed.style.width = rect.width + (prevX- e.clientX) + 'px';

                        ed.style.height = rect.height + (prevY - e.clientY) + 'px';

                        ed.style.top = rect.top - (prevY -e.clientY)+ 'px'

                        ed.style.left = rect.left - (prevX - e.clientX) + 'px'
                    }
                    else if (currentResizer.classList.contains('ne')){

                        ed.style.width = rect.width - (prevX- e.clientX) + 'px';

                        ed.style.height = rect.height + (prevY - e.clientY) + 'px';
                        
                        ed.style.top = rect.top - (prevY -e.clientY)+ 'px'
                    }


                    prevX = e.clientX;
                    prevY = e.clientY;

                    

            }
            else {
                ed.style.height = maxH + 'px'
            }
        }
        
        else{
            ed.style.width = maxW + 'px'
           
        }}
            function mouseup(){
                    window.removeEventListener('mouseup', mouseup)
                    window.removeEventListener('mousemove', mousemove)
                    isResizing = false
            }

        }
    }
    
    
  }
    



  render(){
      
          
         
        
      return (

     
      <div id = {this.props.ids} className = 'Editor' >
          <div  className = 'resizer ne'></div>
          <div  className = 'resizer nw'></div>
          <div  className = 'resizer se'></div>
          <div  className = 'resizer sw'></div>
        <Card bg="dark" text="white" style = {{width: '100%', height: '100%', borderRadius: '10px'}}>

            <Card.Header style = {{cursor: 'move'}} >Layer Editor</Card.Header>
            <Card.Body>{this.props.children}</Card.Body>
        </Card>
      </div>
      
    )
  }
  }


export default Menu;
