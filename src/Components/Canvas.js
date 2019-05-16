import React,{Component} from 'react'

class Canvas extends Component{

  componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        
    }
  render(){

    return (<canvas ref ='canvas'/>)
  }
  }


export default Canvas;
