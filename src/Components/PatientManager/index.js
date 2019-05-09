import React, { Component } from 'react';
import Widget from './PatientCard'
import Drop from './Drop'
import './index.css'

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
class PatientManager extends Component {
  state={
    items: [
      {id:1,name:'Item1'},
      {id:2,name:'Item2'},
      {id:3,name:'Item3'},
      {id:4,name:'Item4'},
      {id:5,name:'Item5'}
    ],
    in_Progress:[],
    concluded:[]

  };
  deleteItem = (id)=>{
    this.setState(prevState=>{
      let items = prevState.items;
      const index=items.findIndex(item =>item.id===id);

      let progression =items.splice(index,1);
      console.log(items)
      console.log(progression)
      const p = prevState.in_Progress;
      p.push(progression[0]);
      console.log(p);
      return {items, p}
    })
    console.log('deleting id:' + id)
  }
  render(){
    return(
      <div>
        <div>
            <Drop id = 'item-container' body ={this.state.items.map ((item,key)=>(<Widget key = {item.id} item = {item} handleDrop = {(id)=> this.deleteItem(id)}/>))} />


        </div>
        <div>
            <Drop id = 'inProgress' body ={this.state.in_Progress.map ((item,key)=>(<Widget key = {item.id} item = {item} handleDrop = {(id)=> this.deleteItem(id)}/>))} />


        </div>
        <div>
            <Drop id = 'Concluded' body ={this.state.concluded.map ((item,key)=>(<Widget key = {item.id} item = {item} handleDrop = {(id)=> this.deleteItem(id)}/>))} />


        </div>
        </div>

    )
  }
};
export default DragDropContext(HTML5Backend)(PatientManager)
