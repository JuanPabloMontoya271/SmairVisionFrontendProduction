import React,{ Component} from 'react'
import axios from 'axios'
import MaterialTable from 'material-table'
import { KeyboardDatePicker, DatePicker } from "@material-ui/pickers";
import {isValid} from 'date-fns'
import TemporaryDrawer from './Menu.js'
function Table (props){
    
    const datap = props.data
    
    
    const init = [{name: 'Monty', last_name: 'Montoya', owner: 'hola'}]
    let data2 = [{'name': 'hola', 'last_name': 'hola'}]

    const [state, setState] = React.useState({
      columns: [
        { title: 'Nombre', field: 'name' },
        { title: 'Apellido', field: 'last_name' },
      ],
      data:datap ,
    });
    console.log("state",state.data);
    
    try {

        return (<MaterialTable
            title="Editable Example"
        
            columns={state.columns}
            data={datap}
            editable={{
              onRowAdd: newData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    setState(prevState => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      setState(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    setState(prevState => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    })
                    
                  }, 600);
                }),
            }}
           
            options={{
              exportButton: true,
              grouping: true
            }}
            detailPanel={rowData => {
              
              
              return (
              <h1>{rowData.name}</h1>
              )
            }}
            onRowClick={(event, rowData, togglePanel) => { togglePanel(); }
            }
          />
      );
        
    } catch (error) {
        console.log(error);
        
    }
        }

class PatientTable extends Component {

    constructor(props, context) {
      super(props, context);
      
      
      
      this.state={
        loading: 'hidden',
        owner :this.props.match.params.param,
        counter :1,
        items: [
  
        ],
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

            {title: 'Fecha de Ingreso', editable : 'never', field: 'fecha_de_ingreso', render: (rowData)=>{
                
           
                   
                    
                    return ( <div >
                
                    <DatePicker
                clearable
                readOnly = {true}
                value={rowData.fecha_de_ingreso}
                format = "MM/dd/yyyy"
               
                
                
               
                
             
                
                format="MM/dd/yyyy"
              /></div>)
            


                        
                    
   
            
            }}
        
          ],
          data:[] ,
       
  
      }
    
  
    }
    componentDidMount(){
      
      
      
      // WARNING SECURITY RISK HERE
      

      axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/globaldynamorequests', {data:{key: 'owner', eq: this.state.owner, table: 'Pacientes'}})
      .then((res)=>{
  
  
        console.log(res);
        this.setState({items: res.data.response['Items'], loading: 'hidden'})
        
      });
  
      
      
  
    }
   
    
    
    
    render(){
  
       
        
      if(true){
      return(
        <div>
        <div style = {{position: 'absolute',zIndex:-1, left: '4vw', width: '96vw',overflowY: 'scroll', height: '90vh'}}><MaterialTable
        title="Editable Example"
    
        columns={this.state.columns}
        data={this.state.items}
        
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                
                let timeStamp = (new Date()).getTime();
                let unique_id = newData.name+'_'+(Math.random()*1000)+'_'+timeStamp
                let ids= unique_id.toString()
                let temp_item= {id: ids, patient: ids,name: newData.name, last_name: newData.last_name, owner :this.state.owner,fecha: newData.fecha, fecha_de_ingreso :new Date()}
               

                axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/dynamopostpatient', {data: temp_item,id : ids, table: 'Pacientes'})
    .then((res)=>{console.log(res);
        axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/globaldynamorequests', {data:{key: 'owner', eq: this.state.owner, table: 'Pacientes'}})
        .then((res)=>{


             console.log(res);
              this.setState({items: res.data.response['Items'], loading: 'hidden'})
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
                          this.setState({items: res.data.response['Items'], loading: 'hidden'})
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
                                this.setState({items: res.data.response['Items'], loading: 'hidden'})
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
          
          
          return (

          <h1>{rowData.name}</h1>
          
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
  