import React, { Component } from 'react';
import './index.css'
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Loading from 'react-loading-components';
import store from '../../store'
import Delete from '../icons/delete5.png'
import {
  Link, Redirect
} from "react-router-dom";

class PatientManager extends Component {

  constructor(props, context) {
    super(props, context);
    
    
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state={
      loading: 'hidden',
      owner :this.props.match.params.param,
      counter :1,
      items: [

      ],
      
      in_Progress:[],
      concluded:[],
      show: false,
      name: '',
      last_name: '',
     

    }
    store.subscribe(()=>{


      this.setState({ user: store.getState().auth_user})
      alert(this.state.user)
    })

  }
  componentDidMount(){
    
    
    
    // WARNING SECURITY RISK HERE
    this.setState({loading: 'visible'})
    axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/globaldynamorequests', {data:{key: 'owner', eq: this.state.owner, table: 'Pacientes'}})
    .then((res)=>{


      console.log(res);
      this.setState({items: res.data.response['Items'], loading: 'hidden'})
      
    });

    

  }
 
  handleUpdate = (evt)=>{

            this.setState({


             name: evt.target.value
            })

  }
  handleUpdateLn = (evt)=>{

    this.setState({


     last_name: evt.target.value
    })

}
  handleClose = ()=> {

    this.setState({ show: false})

  }

  handleShow = ()=> {
    this.setState({ show: true, name:"", last_name: ""  });
    
  }
  handleSave = ()=>{
    let {items, counter, name, last_name, owner} =this.state
    let timeStamp = (new Date()).getTime();
    let unique_id = name+'_'+(Math.random()*1000)+'_'+timeStamp
    let ids= unique_id.toString()
    let temp_item= {id: ids, patient: ids,name: name, last_name: last_name, owner :owner}
    
    //WARNING CONFIG FILE REQUIREMENT FOR SECURITY
    
    counter = counter +1;
    

    //WARNING MORE CONFIG MATERIAL THAT YOU NEED TO SOLVE REALLY SOLVE
 

    this.setState({loading: 'visible'})
    axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/dynamopostpatient', {data: temp_item,id : ids, table: 'Pacientes'})
    .then((res)=>{

      console.log(res);
      items.push(temp_item)
      this.setState({loading: 'hidden'})
    })
    this.setState({ show: false, items, counter })
  }
  
  
  render(){

  
      let {items, loading}  =this.state
      let list_items = items.map((item)=>
      

        <tr key = {item.id} >
        
        <td ><Link to = {'/Viewer/'+ item.id} >{item.id}</Link></td>
        <td><Link to = {'/Viewer/'+ item.id} >{item.name}</Link></td>
        <td><Link to = {'/Viewer/'+ item.id} >{item.last_name}</Link></td>
        <td><Link to = {'/Viewer/'+ item.id} >{item.owner}</Link><Button variant ='danger' style = {{'float': 'right'}} onClick = {()=>{


            console.log('deleted');
            swal({
              title: "Are you sure?",
              text: "Once deleted, you will not be able to recover your file",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
            
                console.log('deleted')
                //WARNING INFO SECRETA SIN PROTEJER
            axios.put('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/globaldelete',{id:item.id, table: 'Pacientes'}).then((res)=>{


              console.log(res);
              this.setState({loading: 'visible'})
                  axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/globaldynamorequests', {data:{key: 'owner', eq: this.state.owner, table: 'Pacientes'}})
                    .then((res)=>{


                         console.log(res);
                          this.setState({items: res.data.response['Items'], loading: 'hidden'})
      
            });

            })
                swal("Succesfully deleted from your database", {
                  title: 'Done',
                  icon: "success",
                });
            
            
              } else {
                swal("Canceled");
              }
            });
            
            
        }}><img src = {Delete}></img></Button></td>
        </tr>
        
      )
      
    if(true){
    return(
      <div >
        <div >
            <div className = 'Tools'><Button variant="primary" onClick={this.handleShow}>
                 Add
               </Button> <div style = {{'visibility': loading, 'position': 'absolute', 'left': '42.5%', 'top': '50%'}}>
               
               <Loading type='bars' width={150} height={150} fill='#216AC2' /></div>

               <Modal show={this.state.show} onHide={this.handleClose}>
                         <Modal.Header closeButton>
                           <Modal.Title><InputGroup className="mb-3"> <FormControl  placeholder = "First Name" id = 'formid' value = {this.state.name} onChange = {this.handleUpdate}/>
                           <FormControl  placeholder = "Last Name" id = 'formid' value = {this.state.last_name} onChange = {this.handleUpdateLn}/>
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
          <div>


          <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Global ID</th>
    </tr>
  </thead>
  <tbody>
    {list_items}
  </tbody>
</Table>
          </div>
            
        </div>

        </div>

    );

    }
    else{

      return(<div><h1>Auth error</h1></div>)
    }
  }
};
export default PatientManager;
