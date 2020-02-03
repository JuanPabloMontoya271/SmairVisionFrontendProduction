import React,{ Component} from 'react'
import axios from 'axios'
import MaterialTable from 'material-table'
import { KeyboardDatePicker, DatePicker } from "@material-ui/pickers";
import {isValid} from 'date-fns'
import store from '../../store'
import TemporaryDrawer from './Menu.js'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import uuid from 'uuid'



class PatientTable extends Component {

    constructor(props, context) {
      super(props, context);
     
  
     
    
      this.state={
        loading: 'hidden',
        owner :this.props.match.params.owner,
        key:  this.props.match.params.key,
        counter :1,
        patient: '',
        items: [
  
        ],
        auth:{},
        show: [],
        
        in_Progress:[],
        concluded:[],
        show: false,
        name: '',
        last_name: '',
        
        columns: [
            { title: 'Nombre', field: 'name' },
            { title: 'Apellido', field: 'last_name' },
            {title: 'Fecha de Nacimiento', field: 'fecha', editComponent : props =>(

                <KeyboardDatePicker 
                    clearable
                    value = {props.value}
                    onChange = {e => {console.log(e);
                      return (props.onChange(e))}}
                    views={["year", "month", "date"]}
                    animateYearScrolling
                
                format="MM/dd/yyyy"
                />
            )            
            ,render: (rowData)=>{
                
               


                    return (
                        <DatePicker 
                        
                        readOnly = {true}
                        value = {rowData.fecha}
                        format = "MM/dd/yyyy"
                        
                        />
                    )
                }
            
            },

            {title: 'Fecha de Ingreso', editable : 'never', field: 'fecha_de_ingreso', render: ()=>{
                
           
                   
                    
                    return ( <div >
                
                    <DatePicker
                clearable
                readOnly = {true}
                value = {new Date()}
                format = "MM/dd/yyyy"
               
                
                
               
                
             
                
                format="MM/dd/yyyy"
              /></div>)
            


                        
                    
   
            
            }}
        
          ],
          data:[] ,
       
  
      }
 
      store.dispatch({type: 'auth_user', auth_user:{key: this.state.key, owner: this.state.owner}})
  
    }
    componentDidMount(){
      
        let pos;
        let location = navigator.geolocation.getCurrentPosition((position)=>{
     
            console.log(position)
            pos = position
        })
        this.setState({position: pos})
      // WARNING SECURITY RISK HERE
    

      axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/globaldynamorequests', {data:{key: 'owner', eq: this.state.owner, table: 'Pacientes'}})
      .then((res)=>{
  
  
        console.log(JSON.parse(res.data.response));
        this.setState({items: JSON.parse(res.data.response)['Items'], loading: 'hidden'})
        
      });
  
      
      
  
    }
   
    
    
    
    render(){
  
       
        
      if(true){
      return(
        <div>
        <div style = {{position: 'absolute',zIndex:-1, left: '4vw', width: '96vw',overflowY: 'scroll', height: '90vh'}}><MaterialTable
        title="Pacientes"
    
        columns={this.state.columns}
        data={this.state.items}
        
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                
                let timeStamp = (new Date()).getTime();
                let unique_id = newData.name+'_'+(Math.random()*1000)+'_'+timeStamp
                let ids= uuid.v4()
                let temp_item= {id: ids, patient: ids,name: newData.name, last_name: newData.last_name, owner :this.state.owner,fecha: newData.fecha, fecha_de_ingreso :new Date()}
               

                axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/dynamopostpatient', {data: temp_item,id : ids, table: 'Pacientes'})
    .then((res)=>{console.log(res);
        axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/globaldynamorequests', {data:{key: 'owner', eq: this.state.owner, table: 'Pacientes'}})
        .then((res)=>{


             console.log(res);
              this.setState({items: JSON.parse(res.data.response)['Items'], loading: 'hidden'})
              resolve();

});
        
        
    })
              }, 600);
            }),
        
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                let ids =oldData.id
               
                axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/dynamopostpatient', {data: newData,id : ids, table: 'Pacientes'}).
                then((res)=>{console.log(res);
                    axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/globaldynamorequests', {data:{key: 'owner', eq: this.state.owner, table: 'Pacientes'}})
                    .then((res)=>{
            
            
                         console.log(res);
                          this.setState({items: JSON.parse(res.data.response)['Items'], loading: 'hidden'})
                          resolve();
            
            }); 
                })
    
                
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
               
                axios.put('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/globaldelete',{id:oldData.id, table: 'Pacientes'}).then((res)=>{


                    console.log(res);
                  
                        axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/globaldynamorequests', {data:{key: 'owner', eq: this.state.owner, table: 'Pacientes'}})
                          .then((res)=>{
      
      
                               console.log(res);
                                this.setState({items: JSON.parse(res.data.response)['Items'], loading: 'hidden'})
                                resolve();
            
                  });
      
                  })
              
                  
                
              }, 600);
            }),
        }}
       
        options={{
          exportButton: true,
          grouping: true,
          selection : true
        }}
        detailPanel={rowData => {
          
          let rutas = [{label: "Análisis Especializado"},{label: 'Historia Clínica'}, {label: 'Nota de Evolución'}, {label: 'Nota de Interconsulta'},{label: 'Nota de Referencia/Traslado'}]
          let lista = rutas.map((item, key)=>{


            return (<ListItem key  = {key} button onClick = {()=>{

                if (item.label!== "Análisis Especializado"){
                let a  = document.createElement("a")
                let int = parseInt(key, 10)-1
                a.href = '/PdfGenerator/'+this.state.key + '/'+this.state.owner+ '/'+ rowData.patient+ '/'+ int
                a.click()}
                else{
                  let a  = document.createElement("a")
                  a.href = '/Test/'+this.state.key+'/'+this.state.owner +'/'+ rowData.patient+ '/'
                  a.click()

                }
               
            }}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>)
          })
          return (

            <div style = {{paddingLeft: '5%'}}>

<List component="nav" aria-label="main mailbox folders">
    {lista}
       
      </List>
      <Divider />
     <List>
      
      </List>
                         </div>
          )
        }}
        onRowClick={(event, rowData, togglePanel) => { togglePanel(); }
        }
      />
      </div>
      <TemporaryDrawer/>
      
      
      </div>
  
      );
  
      }
      else{
  
        return(<div><h1>Auth error</h1></div>)
      }
    }
  }
export default PatientTable;
  