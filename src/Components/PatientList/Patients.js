import React,{Component} from 'react'
import Thumbnail from '../Viewport.js'
import PropTypes from 'prop-types'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import icon from '../icons/icon2.png'
import S3FileUpload from 'react-s3'
import axios from 'axios'
import Delete from '../icons/delete5.png'
import Viewer from '../Viewer.js'
import swal from 'sweetalert';
import store from '../../store'
let newFileName;
const base_url= 'https://bucketdeprueba314.s3.us-east-2.amazonaws.com/Production/'
const config ={
  bucketName: 'bucketdeprueba314',
  dirName: 'Production',
  /* optional */
 region: 'us-east-2',
 accessKeyId: 'AKIA33SE4OYZBDB4RDY5',
 secretAccessKey: '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',



}
let array = ['https://bucketdeprueba314.s3.us-east-2.amazonaws.com/Production/000924cf-0f8d-42bd-9158-1af53881a557_1565107882482.dcm','https://bucketdeprueba314.s3.us-east-2.amazonaws.com/Production/000fe35a-2649-43d4-b027-e67796d412e0_1565669926215.dcm']
class PatientList extends Component{

  constructor(props){
    super(props);
  
    this.state = {

      patients : [],
      loading:'hidden',
      Images: []
    }
    store.subscribe(()=>{


      this.setState({organ:store.getState().organ, Modality: store.getState().Modality, Images: store.getState().Images})
      
    })
    this.Delete = this.Delete.bind(this)
    axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/globaldynamorequests', {data: {key: 'patient_id', eq:this.props.patient, table: 'smairvisiondb'}}).then((res)=>{
      console.log(res.data.response.Items);
      let resArray = res.data.response.Items
      console.log(resArray);
      resArray.sort(function (a,b){
        var dateA = new Date(a.date), dateB = new Date(b.date);
        return (dateB - dateA);
      })
      console.log("sorted",resArray);
      this.setState({patients:resArray, loading: 'hidden' })


    })
  }
  Delete(){
    
    
  }
  componentDidMount(){


    document.getElementById('select-file').addEventListener('change' , (e)=>{


      const file = e.target.files[0];
      const name= file.name
      let timeStamp = (new Date()).getTime();
      let fileExt = file.name.split('.')[file.name.split('.').length-1];
      let fileNameWithoutExt = file.name.replace(`.${fileExt}`,'');
     newFileName = fileNameWithoutExt + '_' + timeStamp + '.' + fileExt;
      let newFile = new File([file], newFileName)
      let DateX = new Date()
      //Upload File to s3
      S3FileUpload.uploadFile(newFile, config)
      .then((data)=>{
          console.log(data);
          this.setState({loading: 'hidden'})

          axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/dynamodb',{data: {id: newFileName,auth: true, file_name: newFileName, user:this.props.user, patient_id: this.props.patient, date: DateX}} ).then((res)=>{
      console.log(res);

      axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/globaldynamorequests', {data: {key: 'patient_id', eq:this.props.patient, table: 'smairvisiondb'}}).then((res)=>{
        console.log(res.data.response.Items);
        let resArray = res.data.response.Items
      
        
        this.setState({patients:resArray, loading: 'hidden' })
        window.location.reload();

      })
    })
      })
      .catch((err)=>{



        alert(err)
      })
      
    })
    //Upload to DynamoDB
    
  }




  render(){
        let {patients, Images} = this.state
        console.log(patients);

        let list = patients.map((item, key) =>{

          
          return(
          
         
                <ListGroup.Item className = 'ItemClass' key ={key} > 
                <div style = {{width: '100%', marginBottom: '30px', borderBottom : '10px solid #bdb9b9', padding: '15px'}}><b>{item.id}</b></div>
                <div  style = {{display: 'inline-block' ,width: '60%'}}>Aqui va la info del paciente</div>
                <div  style = {{  display: 'inline-block', width:'40%'}}>
                  <div style = {{width: '100%', height: '70%' , cursor: 'pointer'}} onClick= {()=>{
                    if(Images.length <4){
                      console.log('display starts at', item.id);
                      Images.push({img:[{id:base_url +item.id, op: 1}, {id: 'https://bucketdeprueba314.s3.us-east-2.amazonaws.com/Production/000924cf-0f8d-42bd-9158-1af53881a557_1565107882482.dcm', op: .5}]})
                      console.log('Length', Images.length);
                      
                      console.log(Images);
                      store.dispatch({type: 'set_Image', 'Images': Images})

                      
                       
                    }else if (Images.length >= 4){
                      alert('Limite alcanzado')
                    }
              
                    
                    
                    
                    
                    
                    
                    }}>
                  <Thumbnail  link= {base_url + item.id} style = {{opacity :1, border: 'solid 4px', borderRadius: '7px', borderColor: '#70C5FF'}} />
                    </div>
                    
                  <div style = {{height: '50%' ,width: '100%', textAlign: 'center', marginTop:'25px'}}>
                    <div style= {{width: '30%', display: 'inline-block'}}>
                      <b>DX L</b>
                      </div>
                    <div style = {{width: '70%', display: 'inline-block' }}>
                      <Button variant = 'danger' style = {{marginLeft: '10px'}} id = 'delete' onClick={()=>{

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
    axios.put('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/dynamodb', {'data':{'id':item.id}}).then((res)=>{

      
   console.log('deleted', item.id);
   axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/globaldynamorequests', {data: {key: 'patient_id', eq:this.props.patient, table: 'smairvisiondb'}}).then((res)=>{
        console.log(res.data.response.Items);
              let resArray = res.data.response.Items
              this.setState({patients:resArray })
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              }).then(()=>{
                window.location.reload();

              })
             
          


})
    })
    
   
    

  } else {
    swal("Canceled");
  }
  
});
                      }}><img src= {Delete}></img></Button>
                      </div>
                    
                    
                    
                  </div>
                  
                  </div>

                </ListGroup.Item>  
         
          
         
          
          )
        })

        return (

     
      <div >
        <Card style = {this.props.style}>
          <Card.Header as ='h5' style = {{height: '70px'}}>
            
            Import Files for Patient here
             <img src={icon} alt = 'icon' className='icon'/>
             <input type = "file" id = "select-file" style = {{cursor: 'pointer'}} />
          
          
          </Card.Header>
          <Card.Body style = {{overflowY: 'scroll'}}>
          <ListGroup>{list}</ListGroup>
          
          </Card.Body>
          
          </Card>
      
      </div>
      
    )
  }
  }
  PatientList.propTypes = {

    style : PropTypes.object,
    patient: PropTypes.string,
    user: PropTypes.string
  }


export default PatientList;