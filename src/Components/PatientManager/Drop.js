import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'

function collect(connect, monitor){
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),

  }
}
class Drop extends Component{
  static propTypes = {
    body: PropTypes.array.isRequired
  };
  render(){

    const {body, connectDropTarget, hovered, item} = this.props;
    //console.log(connectDropTarget);
    const backgroundColor = hovered?  '#a0a0a0': '#3d3d3d';
    return connectDropTarget(<div id = 'drop' className = 'Drop' style = {{background: backgroundColor}}>

      {body}
    </div>)
  };
}

export default DropTarget('card', {}, collect)(Drop)
