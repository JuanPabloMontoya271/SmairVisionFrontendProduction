import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../scss/App.scss'
import axios from 'axios'
import uuid from 'uuid'
import swal from 'sweetalert';
import store from '../../store'
class Login extends Component{
    constructor(props, context){
              super(props, context);
              this.handlePass =this.handlePass.bind(this)
              this.handleUser =this.handleUser.bind(this)
              this.validate = this.validate.bind(this)
            this.state = {
              user : '',
              pass : '',
              query : this.props.match.params
            }

  
    }
  
    componentDidMount(){
      console.log("query params", this.state.query)

      
    }
    handlePass = (evt)=>{

      this.setState({


       pass: evt.target.value
      })

}
handleUser = (evt)=>{

this.setState({


 user: evt.target.value
})

}
validate =  () =>{
    
    axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/auth', {data:{key: 'user', eq: this.state.user, session:{clave: Math.random().toString(),date: new Date(), uuid: uuid.v4()}, table : 'Users', password: this.state.pass}}).then((res)=>{


    console.log(res.data.response, res.data.auth);

    
    if (res.data.auth){
      console.log(res.data.Sesion, res.data.device)
      
      localStorage.setItem('Session',res.data.Sesion)
      localStorage.setItem('Device',res.data.device)
      
      const a  = document.createElement('a')
      a.href = 'Patients2/'+res.data.Sesion+'/'+res.data.response
      a.click();  
    }
    else{
      alert('error')
    }
    })
    console.log('validated');
    //window.open("/insert/your/path/here");
}
    render(){

      return (
          <div>
          <div className = 'Login'>


          <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label >Username</Form.Label>
    <Form.Control className = 'LoginElements' placeholder="Username" value = {this.state.user} onChange = {this.handleUser}/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control className = 'LoginElements' type="password" placeholder="Password" value = {this.state.pass} onChange = {this.handlePass} />
  </Form.Group>
  <Button variant="primary"  onClick = {this.validate}>
    Submit
  </Button>
</Form>



          </div>
          </div>
      );}
     
    }
  
  
  export default Login;