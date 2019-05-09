import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card';
import { DragSource } from 'react-dnd'

const itemSource ={

    beginDrag(props){
      return props.item
    },
    endDrag(props, monitor, component){
      if(!monitor.didDrop()){

        return ;
      }
      console.log(props,monitor, component)
      console.log(props.item.id)
      return props.handleDrop(props.item.id);
    }


}
function collect(connect, monitor){

  return {
    connectDragSource:connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class Widget extends Component{




  render(){
    const {isDragging, connectDragSource,item} = this.props;
    const opacity = isDragging ? 0:1;
        return connectDragSource(<div><Card id = 'card' style = {{opacity: opacity}}>
          <Card.Body><span>{this.props.item.name}</span></Card.Body>
        </Card></div>)



  }
}
export default DragSource('card', itemSource, collect)(Widget);
