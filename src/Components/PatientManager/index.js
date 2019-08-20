import React, { Component } from 'react';
import Widget from './PatientCard'
import Drop from './Drop'
import './index.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
class PatientManager extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state={
      counter :1,
      items: [

      ],
      in_Progress:[],
      concluded:[],
      show: false,
      name: ''

    }

  }
  handleUpdate = (evt)=>{

            this.setState({


             name: evt.target.value
            })

  }
  handleClose = ()=> {

    this.setState({ show: false})

  }

  handleShow = ()=> {
    this.setState({ show: true });
  }
  handleSave = ()=>{
    let {items, counter, name} =this.state

    counter = counter +1;
    items.push({id: counter, name: name, cs:0})
    this.setState({ show: false, items, counter })
  }
  deleteItem = (id)=>{
    this.setState(prevState=>{
      let items = prevState.items;

      const index=items.findIndex(item =>item.id===id);


      let progression =items.splice(index,1);
      const p = prevState.in_Progress;
      const c = prevState.concluded;

      p.push(progression[0]);
      console.log(p);
      return {items, p}
    })
    console.log('deleting id:' + id)
  }

  deleteItem2 = (id)=>{
    this.setState(prevState=>{
      let items = prevState.items;
      const p = prevState.in_Progress;

      const index=p.findIndex(item =>item.id===id);



      let progression =p.splice(index,1);

      items.push(progression[0]);

      return {items, p}
    })
    console.log('deleting id:' + id)
  }
  render(){
    return(
      <div >
        <div >
            <div className = 'Tools'><Button variant="primary" onClick={this.handleShow}>
                 Add
               </Button>

               <Modal show={this.state.show} onHide={this.handleClose}>
                         <Modal.Header closeButton>
                           <Modal.Title><InputGroup className="mb-3"> <FormControl  placeholder = "Patient Name" id = 'formid' value = {this.state.name} onChange = {this.handleUpdate}/>
</InputGroup></Modal.Title>

                         </Modal.Header>
                         <Modal.Body>Medical History</Modal.Body>
                         <Modal.Footer>
                           <Button variant="secondary" onClick={this.handleClose}>
                             Close
                           </Button>
                           <Button variant="primary" onClick={this.handleSave}>
                             Save Changes
                           </Button>
                         </Modal.Footer>
                       </Modal>

               </div>
           

        </div>
        <div>
          <div></div>
            
        </div>

        </div>

    )
  }
};
export default PatientManager;
