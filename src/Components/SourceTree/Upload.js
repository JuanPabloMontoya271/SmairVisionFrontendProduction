import React, {Component} from 'react';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import 'react-sortable-tree/style.css'
import SortableTree from 'react-sortable-tree';


let data = [{ title: 'Chicken', children: [{ title: 'Egg' }] }, {title: 'Hola'}];
let bol = false;
export default class Tree extends Component {

  constructor(props) {
    super(props);


    this.state = {
      treeData: data
    };
this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    
         }

  render() {

    return (
      <div style={{ height: 400 }}>
      <input id = "input"></input>
      <button id= "button" onClick = {this.handleClick}>+</button>
        <SortableTree
          treeData={this.state.treeData}
         onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}
