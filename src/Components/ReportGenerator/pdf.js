import * as pdf from  './pdf_utils.js';
import axios from 'axios'
import React, {Component, useState} from 'react'
import { makeStyles, createMuiTheme,  MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import  {green}  from '@material-ui/core/colors'

import MaterialTable from 'material-table';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import store from '../../store'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
const label = []
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': '062e7186-1805-4396-b6a2-2dccc3764c89' //Get your API key from https://portal.api2pdf.com
  }



  const useStyles= makeStyles({
    MS:{ width: '25%',},
    Check: {color: '#70C5FF',
    display: 'inline-block',
    textAlign:'center',
    '&$checked': {
      color: '#70C5FF' ,
    },
  },
  Form:{color: 'gray !important', textAlign: 'left'},
  Label: {display: 'inline-block',color: 'gray !important'},
   stepper:{width: '100px'}, 
    InputLabel:{color: '#70C5FF'},
    Unpadded:{
      width: '25%',
    height: '30%',
    margin:'0px',
    borderColor: ' #70C5FF',
    borderRadius: 4,
    cssStandardInput: {
      "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
        borderColor: "red" //default      
      },
      "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
        borderColor: "blue" //hovered
      },
      "&$cssFocused $notchedOutline": {
        borderColor: "purple" //focused
      }
    },
 '& label.Mui-focused': {
  color: '#70C5FF',
  borderWidth: 2,
 },
 '& .MuiInput-underline:after': {
  borderBottomColor: ' #70C5FF',
  borderWidth: 2,
 },
'& .MuiOutlinedInput-root': {
  
  '& fieldset': {
    borderColor: ' #70C5FF',
    borderWidth: 2,
  },
  '&:hover fieldset': {
    borderColor: ' #70C5FF',
    borderWidth: 2,
  },
  '&.Mui-focused fieldset': {
    borderColor: ' #70C5FF',
    borderWidth: 2,
  },
},
},
button:{
  backgroundColor: ' #70C5FF',
  '&:hover': {
    backgroundColor: '#70C5FF',
    borderColor: '#70C5FF',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#70C5FF',
    borderColor: '#70C5FF',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
},
step:{

  color: 'red',
    

},
alternativeLabel: {},
  active: {}, //needed so that the &$active tag works
  completed: {},
  disabled: {},
  multi: {

    width: '40%',
      height: '30%',
      paddingTop: '10px',
      paddingBottom: '10px',
      borderColor: ' #70C5FF',
      borderRadius: 4,
      
      cssStandardInput: {
        "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
          borderColor: "red" //default      
        },
        "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
          borderColor: "blue" //hovered
        },
        "&$cssFocused $notchedOutline": {
          borderColor: "purple" //focused
        }
      },
   '& label.Mui-focused': {
    color: '#70C5FF',
    borderWidth: 2,
   },

   '& .MuiInput-underline:after': {
    borderBottomColor: ' #70C5FF',
    borderWidth: 2,
   },
  '& .MuiOutlinedInput-root': {
    
    '& fieldset': {
      borderColor: ' #70C5FF',
      borderWidth: 2,
     
    },
    '&:hover fieldset': {
      borderColor: ' #70C5FF',
      borderWidth: 2,
    },
    '&.Mui-focused fieldset': {
      borderColor: ' #70C5FF',
      borderWidth: 2,
    },
  },
},
    root: {

      width: '25%',
        height: '30%',
        paddingTop: '10px',
        paddingBottom: '10px',
        borderColor: ' #70C5FF',
        borderRadius: 4,
        cssStandardInput: {
          "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
            borderColor: "red" //default      
          },
          "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
            borderColor: "blue" //hovered
          },
          "&$cssFocused $notchedOutline": {
            borderColor: "purple" //focused
          }
        },
     '& label.Mui-focused': {
      color: '#70C5FF',
      borderWidth: 2,
     },

     '& .MuiInput-underline:after': {
      borderBottomColor: ' #70C5FF',
      borderWidth: 2,
     },
    '& .MuiOutlinedInput-root': {
      
      '& fieldset': {
        borderColor: ' #70C5FF',
        borderWidth: 2,
      },
      '&:hover fieldset': {
        borderColor: ' #70C5FF',
        borderWidth: 2,
      },
      '&.Mui-focused fieldset': {
        borderColor: ' #70C5FF',
        borderWidth: 2,
      },
    },
  },})
  const theme = createMuiTheme({
    palette: {
      primary: {
          main: '#70C5FF'
      },
    },
  });
 
function BasicTextFields(props) {
    const classes = useStyles()
    console.log(props.datos)
    console.log('setState')
    console.log(props.age)
    const [sampleState, setState] = useState({hola:'helloWorld', index: 0, done: false})
    const [age, setAge]= useState(props.age)
    const [open, setOpen]= useState(false)
    const [checkBox, check]= useState(props.checkBox !=null ?props.checkBox:{'Tetraciclina': false,'Amoxiciclina': false, 'Acitromicina': false, 'Ciprofloxacino': false,  'Doxiciclina': false, 'Codeína': false, 'Claritomicina': false, 'Sulfonamida': false, 'Penicilina': false})
    const [Alergias, setAlergias] = useState(props.Alergias)
    const [otros, setOtros]= useState(props.Otros)
    const [datos, setDatos]= useState(props.datos)
    const [datosAgrupados, setDatosAg] = useState({})
   
    store.subscribe(()=>{
      let img = store.getState().data[props.id]

      console.log(img)
     
      
      
    })
    console.log("MS:", age, "Input:",datos, "Check:", checkBox, "alergias", Alergias, "otros", otros , 'id: ', props.id, 'DF', datosAgrupados);
   
    let arr = props.props.inputs
    let form  = arr.map((item, key)=>{
   
        
        if (item.index == sampleState.index){
          if(item.type == 'input'){
              return (
          
                  <div key  = {key} style = {props.styles}>
                      <div>
                  <MuiThemeProvider theme = {theme}><TextField
              className ={classes.root}
              label={item.label}
              value = {datos[item.label]!= null? datos[item.label]: "_"}
              onChange={(evt)=>{ setDatos({...datos,[item.label]: evt.target.value!=""? evt.target.value:"*" });
              }}
           
              id="mui-theme-provider-standard-input"
            /></MuiThemeProvider>
            </div>
  
              
              </div>

          
          


          )
      }
      else if (item.type == 'B'){
    
        
        const handleBool = name =>event=>{
         
          
          setAlergias({...Alergias,[item.index]:event.target.checked})
         
        
        }
        return (<div key = {key}  style = {{paddingLeft: '31.5%', marginTop: '10px',textAlign: 'left'}}>
          <FormControl className className = {classes.Form} component="fieldset"><FormLabel className = {classes.Label} component="legend">{item.label}</FormLabel>
          <FormControlLabel
            control={<Checkbox style ={{
              color: '#70C5FF',
            }}className = {classes.Check[item.id]} onChange = {handleBool(item.id)}/>}
            checked = {Alergias[item.index]!= null? Alergias[item.index]: false}
            label={item.cons}
          /></FormControl>
          </div>)
          
        
      }
      else if (item.type == 'CheckList'){
        
        
        if (!Alergias[item.index]){
          let itid = item.index
          let lista  = item.lista.map((item, key) =>{
            if(item != 'Otros'){
              
              
              let id = item
              const handleChange = name => event=>{
                check({...checkBox, [name]: event.target.checked})
                 }
              return ( <div key = {key}><FormControlLabel
              control={<Checkbox style ={{
                color: '#70C5FF',

              }}className = {classes.Check} checked  = {checkBox[id]!= null?checkBox[id]: false} onChange = {handleChange(id)}/>}
              label={item}
            /></div>)}
            else{
  
              return (
  
                <MuiThemeProvider key = {key} theme = {theme}><TextField
                
                className ={classes.Unpadded}
                label={item}
                onChange = {(evt)=>{setOtros({...otros, [item+itid]: evt.target.value})}}
                id="mui-theme-provider-standard-input"
              /></MuiThemeProvider>
              )
            }
         
              
              
          }
              
              
  
          )
          return (<div key = {key} style ={{display:'inline-block', marginTop: '30px',marginLeft: '100px', marginRight: '100px'}} >
          <FormControl className = {classes.Form}component="fieldset"><FormLabel className = {classes.Form} component="legend">{item.label}</FormLabel>{lista}</FormControl></div>)


            
        }
        else{

          console.log('hidden');
          
          
        }
      
  
        
        
      }
      
      else if(item.type == 'multiline_input'){
        return (
          
          <div key  = {key} style = {{}}>
              <div style = {{}}>
          <MuiThemeProvider theme = {theme}><TextField
          required
      className ={classes.multi}
      margin = 'normal'
      label={item.label}
      value = {datos[item.label]!= null? datos[item.label]: ""}
      multiline
      rows="4"
      onChange={(evt)=>{ setDatos({...datos,[item.label]: evt.target.value});  
      }}
    
      id="mui-theme-provider-standard-input"
    /></MuiThemeProvider>
    </div>

      
      </div>

  
  


  )

      }
    else if(item.type == 'MS'){
      
      let listy = item.ops.map((item, key)=>{
        
        return (<MenuItem key = {key} className = {classes.MSS} value={item}>{item}</MenuItem>
          
         )
      })
     
      return (<div key ={key}>
        <FormControl className = {classes.root}>
      <InputLabel id="demo-controlled-open-select-label">{item.label}</InputLabel>
        <Select
        className = {classes.MS}
       
        id="demo-controlled-open-select"
        open={open.n}
        onClose={()=>{setOpen(false)
        }}
        onOpen={()=>{setOpen(true)
        }}
        
        value={age[item.label]}
        onChange={(evt)=>{setAge({...age,[item.label]: evt.target.value});}    }
      >
         <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {listy}
        
        </Select></FormControl></div>)
    }
    }
  
   
    
           
    }
      
  
  )
    let steps = ['Datos Personales', 'Alergias', 'Otras Alergias', 'hkdsjhkdjhks', 'ksjdhksjhkdj', 'jaksjkasjahks','jashkajhskajshka', '19812098210982']
   if (!sampleState.done){
    return (
    
    <div style = {{textAlign: 'center'}}>
        <div style = {{ height: '70vh',overflowY : 'scroll'}}>
         {form}
         </div>
         <div> 
         <div style = {{position: 'absolute', right: '20vw', bottom: '20vh'}}>  <Button className  ={classes.button} onClick = {()=>{ let ots = otros != null? otros: "default";let al =Alergias!= null?Alergias: "default";let inp =datos!=null?datos:"default";axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/expediente',{req: 'POST',id:props.patient,patient : props.patient,data: {age, checkBox, inp, ots, Alergias }}).then((res)=>{alert("saved");let data = JSON.parse(res.data.res); setDatosAg(data); setAge(data.Item.name.age); setDatos(data.Item.name.inp); check(data.Item.name.checkBox);setOtros(data.Item.name.ots);setAlergias(data.Item.name.Alergias)})
         
        }}>Save</Button> </div>
         <div style = {{position: 'absolute', left: '20vw', bottom: '50vh'}}>  <Button className  ={classes.button} onClick = {()=>{ setState({index:sampleState.index>0? sampleState.index -1:sampleState.index}); 
        }}> <NavigateBeforeRoundedIcon/></Button></div>
        <div style = {{position: 'absolute', left: '78vw', bottom: '50vh'}}> <Button className  ={classes.button} onClick = {()=>{setState({index:sampleState.index<=steps.length? sampleState.index +1:sampleState.index, done: sampleState.index< steps.lenght?true:false});
        }}> <NavigateNextRoundedIcon/></Button></div>
         <div style = {{zIndex : '-1',overflowX: 'auto',position: "absolute", bottom: '0',left: '4vw',width : '94vw'}}>
         <Stepper  className= 'stepper' activeStep={sampleState.index} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel
            
            StepIconProps={{
              classes: {
               
                completed: classes.step,
                active: classes.step,
               
              }
            }}
            >{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </div>  
         </div>
    
    </div>)}
    else{

     

        return (<div><h1>Done!</h1><Button onClick={(event)=>{
          let html = []
          html.push (pdf.head( pdf.bootstrap()+pdf.withTheme()))
          html.push (pdf.sbody())
         
          html.push (pdf.h1(datos))
          html.push (pdf.ebody())
          
          
          fetch('https://v2018.api2pdf.com/chrome/html', {
            method: 'post',
            headers: headers,
            body: JSON.stringify({html: html.join(''), inlinePdf: true, fileName: 'test.pdf' })
          }).then(res=>res.json())
            .then(
              res => {
                console.log(res);
      
                const url = window.URL.createObjectURL(new Blob([res.pdf]))
                console.log(url);
                window.open(res.pdf)
                const link = document.createElement('a');
      link.href = res.pdf;
      document.body.appendChild(link);
      link.download= 'hola.pdf';
              } 
           
            
            );
          console.log("ejemplo",datosAgrupados)
        
        
        }}>Export as PDF</Button><Button>Return Home</Button></div>)
     
    }

}
function BasicTextFields2(props) {
  const classes = useStyles()
  const [sampleState, setState] = useState({hola:'helloWorld', index: 0, done: false})
  const [age, setAge]= useState({"Sexo": '', "Estado Civil":''})
  const [open, setOpen]= useState(false)
  const [checkBox, check]= useState({'Tetraciclina': false,'Amoxiciclina': false, 'Acitromicina': false, 'Ciprofloxacino': false,  'Doxiciclina': false, 'Codeína': false, 'Claritomicina': false, 'Sulfonamida': false, 'Penicilina': false})
  const [Alergias, setAlergias] = useState({})
  const [otros, setOtros]= useState({})
  const [datos, setDatos]= useState({})
  
  console.log("MS:", age, "Input:",datos, "Check:", checkBox, "alergias", Alergias, "otros", otros , 'id: ', props.id);
  
  let arr = props.props.inputs
  let form  = arr.map((item, key)=>{
 
      
      if (item.index == sampleState.index){
        if(item.type == 'input'){
            return (
        
                <div key  = {key} style = {props.styles}>
                    <div>
                <MuiThemeProvider theme = {theme}><TextField
            className ={classes.root}
            label={item.label}
            value = {datos[item.label]!= null? datos[item.label]: ""}
            onChange={(evt)=>{ setDatos({...datos,[item.label]: evt.target.value})
            
            }}
         
            id="mui-theme-provider-standard-input"
          /></MuiThemeProvider>
          </div>

            
            </div>

        
        


        )
    }
    else if (item.type == 'B'){
  
      
      const handleBool = name =>event=>{
       
        
        setAlergias({...Alergias,[item.index]:event.target.checked})
      
      }
      return (<div key = {key}  style = {{paddingLeft: '31.5%', marginTop: '10px',textAlign: 'left'}}>
        <FormControl className className = {classes.Form} component="fieldset"><FormLabel className = {classes.Label} component="legend">{item.label}</FormLabel>
        <FormControlLabel
          control={<Checkbox style ={{
            color: '#70C5FF',
          }}className = {classes.Check[item.id]} onChange = {handleBool(item.id)}/>}
          checked = {Alergias[item.index]!= null? Alergias[item.index]: false}
          label={item.cons}
        /></FormControl>
        </div>)
        
      
    }
    else if (item.type == 'CheckList'){
      
      
      if (!Alergias[item.index]){
        let itid = item.index
        let lista  = item.lista.map((item, key) =>{
          if(item != 'Otros'){
            
            
            let id = item
            const handleChange = name => event=>{
              check({...checkBox, [name]: event.target.checked})}
            return ( <div key = {key}><FormControlLabel
            control={<Checkbox style ={{
              color: '#70C5FF',
            }}className = {classes.Check} checked  = {checkBox[id]!= null?checkBox[id]: false} onChange = {handleChange(id)}/>}
            label={item}
          /></div>)}
          else{

            return (

              <MuiThemeProvider theme = {theme}><TextField
              
              className ={classes.Unpadded}
              label={item}
              onChange = {(evt)=>{setOtros({...otros, [item+itid]: evt.target.value})}}
              id="mui-theme-provider-standard-input"
            /></MuiThemeProvider>
            )
          }
       
            
            
        }
            
            

        )
        return (<div key = {key} style ={{display:'inline-block', marginTop: '30px',marginLeft: '100px', marginRight: '100px'}} >
        <FormControl className = {classes.Form}component="fieldset"><FormLabel className = {classes.Form} component="legend">{item.label}</FormLabel>{lista}</FormControl></div>)


          
      }
      else{

        console.log('hidden');
        
        
      }
    

      
      
    }
    
    else if(item.type == 'multiline_input'){
      return (
        
        <div key  = {key} style = {{}}>
            <div style = {{}}>
        <MuiThemeProvider theme = {theme}><TextField
        required
    className ={classes.multi}
    margin = 'normal'
    label={item.label}
    value = {datos[item.label]!= null? datos[item.label]: ""}
    multiline
    rows="4"
    onChange={(evt)=>{ setDatos({...datos,[item.label]: evt.target.value})
    
    }}
  
    id="mui-theme-provider-standard-input"
  /></MuiThemeProvider>
  </div>

    
    </div>





)

    }
  else if(item.type == 'MS'){
    
    let listy = item.ops.map((item, key)=>{
      
      return (<MenuItem key = {key} className = {classes.MSS} value={item}>{item}</MenuItem>
        
       )
    })
   
    return (<div key ={key}>
      <FormControl className = {classes.root}>
    <InputLabel id="demo-controlled-open-select-label">{item.label}</InputLabel>
      <Select
      className = {classes.MS}
     
      id="demo-controlled-open-select"
      open={open.n}
      onClose={()=>{setOpen(false)
      }}
      onOpen={()=>{setOpen(true)
      }}
      
      value={age[item.label]}
      onChange={(evt)=>setAge({...age,[item.label]: evt.target.value})
      }
    >
       <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {listy}
      
      </Select></FormControl></div>)
  }
  }

 
  
         
  }
    

)
  let steps = ['Datos Personales', 'Alergias', 'Otras Alergias', 'hkdsjhkdjhks', 'ksjdhksjhkdj', 'jaksjkasjahks','jashkajhskajshka', '19812098210982']
 if (!sampleState.done){
  return (
  
  <div style = {{textAlign: 'center'}}>
      <div style = {{ height: '70vh',overflowY : 'scroll'}}>
       {form}
       </div>
       <div> 

       <div style = {{position: 'absolute', left: '20vw', bottom: '50vh'}}>  <Button className  ={classes.button} onClick = {()=>{ setState({index:sampleState.index>0? sampleState.index -1:sampleState.index})
       
      }}> <NavigateBeforeRoundedIcon/></Button></div>
      <div style = {{position: 'absolute', left: '78vw', bottom: '50vh'}}> <Button className  ={classes.button} onClick = {()=>{setState({index:sampleState.index<steps.length?sampleState.index +1: sampleState.index, done:sampleState.index<steps.length?false:true })
       
      }}> <NavigateNextRoundedIcon/></Button></div>
       <div style = {{zIndex : '-1',overflowX: 'auto',position: "absolute", bottom: '0',left: '4vw',width : '94vw'}}>
       <Stepper  className= 'stepper' activeStep={sampleState.index} alternativeLabel>
      {steps.map(label => (
        <Step key={label}>
          <StepLabel
          
          StepIconProps={{
            classes: {
             
              completed: classes.step,
              active: classes.step,
             
            }
          }}
          >{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    </div>  
       </div>
  
  </div>)}
  else{

   

      return (<h1>Done!</h1>)
   
  }

}
function BasicTextFields3(props) {
  const classes = useStyles()
  const [sampleState, setState] = useState({hola:'helloWorld', index: 0, done: false})
  const [age, setAge]= useState({"Sexo": '', "Estado Civil":''})
  const [open, setOpen]= useState(false)
  const [checkBox, check]= useState({'Tetraciclina': false,'Amoxiciclina': false, 'Acitromicina': false, 'Ciprofloxacino': false,  'Doxiciclina': false, 'Codeína': false, 'Claritomicina': false, 'Sulfonamida': false, 'Penicilina': false})
  const [Alergias, setAlergias] = useState({})
  const [otros, setOtros]= useState({})
  const [datos, setDatos]= useState({})
  
  console.log("MS:", age, "Input:",datos, "Check:", checkBox, "alergias", Alergias, "otros", otros , 'id: ', props.id);
  
  let arr = props.props.inputs
  let form  = arr.map((item, key)=>{
 
      
      if (item.index == sampleState.index){
        if(item.type == 'input'){
            return (
        
                <div key  = {key} style = {props.styles}>
                    <div>
                <MuiThemeProvider theme = {theme}><TextField
            className ={classes.root}
            label={item.label}
            value = {datos[item.label]!= null? datos[item.label]: ""}
            onChange={(evt)=>{ setDatos({...datos,[item.label]: evt.target.value})
            
            }}
         
            id="mui-theme-provider-standard-input"
          /></MuiThemeProvider>
          </div>

            
            </div>

        
        


        )
    }
    else if (item.type == 'B'){
  
      
      const handleBool = name =>event=>{
       
        
        setAlergias({...Alergias,[item.index]:event.target.checked})
      
      }
      return (<div key = {key}  style = {{paddingLeft: '31.5%', marginTop: '10px',textAlign: 'left'}}>
        <FormControl className className = {classes.Form} component="fieldset"><FormLabel className = {classes.Label} component="legend">{item.label}</FormLabel>
        <FormControlLabel
          control={<Checkbox style ={{
            color: '#70C5FF',
          }}className = {classes.Check[item.id]} onChange = {handleBool(item.id)}/>}
          checked = {Alergias[item.index]!= null? Alergias[item.index]: false}
          label={item.cons}
        /></FormControl>
        </div>)
        
      
    }
    else if (item.type == 'CheckList'){
      
      
      if (!Alergias[item.index]){
        let itid = item.index
        let lista  = item.lista.map((item, key) =>{
          if(item != 'Otros'){
            
            
            let id = item
            const handleChange = name => event=>{
              check({...checkBox, [name]: event.target.checked})}
            return ( <div key = {key}><FormControlLabel
            control={<Checkbox style ={{
              color: '#70C5FF',
            }}className = {classes.Check} checked  = {checkBox[id]!= null?checkBox[id]: false} onChange = {handleChange(id)}/>}
            label={item}
          /></div>)}
          else{

            return (

              <MuiThemeProvider theme = {theme}><TextField
              
              className ={classes.Unpadded}
              label={item}
              onChange = {(evt)=>{setOtros({...otros, [item+itid]: evt.target.value})}}
              id="mui-theme-provider-standard-input"
            /></MuiThemeProvider>
            )
          }
       
            
            
        }
            
            

        )
        return (<div key = {key} style ={{display:'inline-block', marginTop: '30px',marginLeft: '100px', marginRight: '100px'}} >
        <FormControl className = {classes.Form}component="fieldset"><FormLabel className = {classes.Form} component="legend">{item.label}</FormLabel>{lista}</FormControl></div>)


          
      }
      else{

        console.log('hidden');
        
        
      }
    

      
      
    }
    
    else if(item.type == 'multiline_input'){
      return (
        
        <div key  = {key} style = {{}}>
            <div style = {{}}>
        <MuiThemeProvider theme = {theme}><TextField
        required
    className ={classes.multi}
    margin = 'normal'
    label={item.label}
    value = {datos[item.label]!= null? datos[item.label]: ""}
    multiline
    rows="4"
    onChange={(evt)=>{ setDatos({...datos,[item.label]: evt.target.value})
    
    }}
  
    id="mui-theme-provider-standard-input"
  /></MuiThemeProvider>
  </div>

    
    </div>





)

    }
  else if(item.type == 'MS'){
    
    let listy = item.ops.map((item, key)=>{
      
      return (<MenuItem key = {key} className = {classes.MSS} value={item}>{item}</MenuItem>
        
       )
    })
   
    return (<div key ={key}>
      <FormControl className = {classes.root}>
    <InputLabel id="demo-controlled-open-select-label">{item.label}</InputLabel>
      <Select
      className = {classes.MS}
     
      id="demo-controlled-open-select"
      open={open.n}
      onClose={()=>{setOpen(false)
      }}
      onOpen={()=>{setOpen(true)
      }}
      
      value={age[item.label]}
      onChange={(evt)=>setAge({...age,[item.label]: evt.target.value})
      }
    >
       <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {listy}
      
      </Select></FormControl></div>)
  }
  }

 
  
         
  }
    

)
  let steps = ['Datos Personales', 'Alergias', 'Otras Alergias', 'hkdsjhkdjhks', 'ksjdhksjhkdj', 'jaksjkasjahks','jashkajhskajshka', '19812098210982']
 if (!sampleState.done){
  return (
  
  <div style = {{textAlign: 'center'}}>
      <div style = {{ height: '70vh',overflowY : 'scroll'}}>
       {form}
       </div>
       <div> 

       <div style = {{position: 'absolute', left: '20vw', bottom: '50vh'}}>  <Button className  ={classes.button} onClick = {()=>{ setState({index:sampleState.index>0? sampleState.index -1:sampleState.index})
       
      }}> <NavigateBeforeRoundedIcon/></Button></div>
      <div style = {{position: 'absolute', left: '78vw', bottom: '50vh'}}> <Button className  ={classes.button} onClick = {()=>{setState({index:sampleState.index<steps.length?sampleState.index +1: sampleState.index, done:sampleState.index<steps.length?false:true })
       
      }}> <NavigateNextRoundedIcon/></Button></div>
       <div style = {{zIndex : '-1',overflowX: 'auto',position: "absolute", bottom: '0',left: '4vw',width : '94vw'}}>
       <Stepper  className= 'stepper' activeStep={sampleState.index} alternativeLabel>
      {steps.map(label => (
        <Step key={label}>
          <StepLabel
          
          StepIconProps={{
            classes: {
             
              completed: classes.step,
              active: classes.step,
             
            }
          }}
          >{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    </div>  
       </div>
  
  </div>)}
  else{

   

      return (<h1>Done!</h1>)
   
  }

}
function BasicTextFields4(props) {
  const respaldo = {'Tetraciclina': false,'Amoxiciclina': false, 'Acitromicina': false, 'Ciprofloxacino': false,  'Doxiciclina': false, 'Codeína': false, 'Claritomicina': false, 'Sulfonamida': false, 'Penicilina': false}
  const classes = useStyles()
  const [sampleState, setState] = useState({hola:'helloWorld', index: 0, done: false})
  const [age, setAge]= useState(props.age)
  const [open, setOpen]= useState(false)
  const [checkBox, check]= useState(props.checkBox)
  const [Alergias, setAlergias] = useState(props.Alergias)
  const [otros, setOtros]= useState(props.Otros)
  const [datos, setDatos]= useState(props.datos)
  
  console.log("MS:", age, "Input:",datos, "Check:", checkBox, "alergias", Alergias, "otros", otros , 'id: ', props.id);
  
  let arr = props.props.inputs
  let form  = arr.map((item, key)=>{
 
      
      if (item.index == sampleState.index){
        if(item.type == 'input'){
            return (
        
                <div key  = {key} style = {props.styles}>
                    <div>
                <MuiThemeProvider theme = {theme}><TextField
            className ={classes.root}
            label={item.label}
            value = {datos[item.label]!= null? datos[item.label]: ""}
            onChange={(evt)=>{ setDatos({...datos,[item.label]: evt.target.value})
            
            }}
         
            id="mui-theme-provider-standard-input"
          /></MuiThemeProvider>
          </div>

            
            </div>

        
        


        )
    }
    else if (item.type == 'B'){
  
      
      const handleBool = name =>event=>{
       
        
        setAlergias({...Alergias,[item.index]:event.target.checked})
      
      }
      return (<div key = {key}  style = {{paddingLeft: '31.5%', marginTop: '10px',textAlign: 'left'}}>
        <FormControl className className = {classes.Form} component="fieldset"><FormLabel className = {classes.Label} component="legend">{item.label}</FormLabel>
        <FormControlLabel
          control={<Checkbox style ={{
            color: '#70C5FF',
          }}className = {classes.Check[item.id]} onChange = {handleBool(item.id)}/>}
          checked = {Alergias[item.index]!= null? Alergias[item.index]: false}
          label={item.cons}
        /></FormControl>
        </div>)
        
      
    }
    else if (item.type == 'CheckList'){
      
      
      if (!Alergias[item.index]){
        let itid = item.index
        let lista  = item.lista.map((item, key) =>{
          if(item != 'Otros'){
            
            
            let id = item
            const handleChange = name => event=>{
              check({...checkBox, [name]: event.target.checked})}
            return ( <div key = {key}><FormControlLabel
            control={<Checkbox style ={{
              color: '#70C5FF',
            }}className = {classes.Check} checked  = {checkBox[id]!= null?checkBox[id]: false} onChange = {handleChange(id)}/>}
            label={item}
          /></div>)}
          else{

            return (

              <MuiThemeProvider theme = {theme}><TextField
              
              className ={classes.Unpadded}
              label={item}
              onChange = {(evt)=>{setOtros({...otros, [item+itid]: evt.target.value})}}
              id="mui-theme-provider-standard-input"
            /></MuiThemeProvider>
            )
          }
       
            
            
        }
            
            

        )
        return (<div key = {key} style ={{display:'inline-block', marginTop: '30px',marginLeft: '100px', marginRight: '100px'}} >
        <FormControl className = {classes.Form}component="fieldset"><FormLabel className = {classes.Form} component="legend">{item.label}</FormLabel>{lista}</FormControl></div>)


          
      }
      else{

        console.log('hidden');
        
        
      }
    

      
      
    }
    
    else if(item.type == 'multiline_input'){
      return (
        
        <div key  = {key} style = {{}}>
            <div style = {{}}>
        <MuiThemeProvider theme = {theme}><TextField
        required
    className ={classes.multi}
    margin = 'normal'
    label={item.label}
    value = {datos[item.label]!= null? datos[item.label]: ""}
    multiline
    rows="4"
    onChange={(evt)=>{ setDatos({...datos,[item.label]: evt.target.value})
    
    }}
  
    id="mui-theme-provider-standard-input"
  /></MuiThemeProvider>
  </div>

    
    </div>





)

    }
  else if(item.type == 'MS'){
    
    let listy = item.ops.map((item, key)=>{
      
      return (<MenuItem key = {key} className = {classes.MSS} value={item}>{item}</MenuItem>
        
       )
    })
   
    return (<div key ={key}>
      <FormControl className = {classes.root}>
    <InputLabel id="demo-controlled-open-select-label">{item.label}</InputLabel>
      <Select
      className = {classes.MS}
     
      id="demo-controlled-open-select"
      open={open.n}
      onClose={()=>{setOpen(false)
      }}
      onOpen={()=>{setOpen(true)
      }}
      
      value={age[item.label]}
      onChange={(evt)=>setAge({...age,[item.label]: evt.target.value})
      }
    >
       <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {listy}
      
      </Select></FormControl></div>)
  }
  }

 
  
         
  }
    

)
  let steps = ['Datos Personales', 'Alergias', 'Otras Alergias', 'hkdsjhkdjhks', 'ksjdhksjhkdj', 'jaksjkasjahks','jashkajhskajshka', '19812098210982']
 if (!sampleState.done){
  return (
  
  <div style = {{textAlign: 'center'}}>
      <div style = {{ height: '70vh',overflowY : 'scroll'}}>
       {form}
       </div>
       <div> 

       <div style = {{position: 'absolute', left: '20vw', bottom: '50vh'}}>  <Button className  ={classes.button} onClick = {()=>{ setState({index:sampleState.index>0? sampleState.index -1:sampleState.index})
       
      }}> <NavigateBeforeRoundedIcon/></Button></div>
      <div style = {{position: 'absolute', left: '78vw', bottom: '50vh'}}> <Button className  ={classes.button} onClick = {()=>{setState({index:sampleState.index<steps.length?sampleState.index +1: sampleState.index, done:sampleState.index<steps.length?false:true })
       
      }}> <NavigateNextRoundedIcon/></Button></div>
       <div style = {{zIndex : '-1',overflowX: 'auto',position: "absolute", bottom: '0',left: '4vw',width : '94vw'}}>
       <Stepper  className= 'stepper' activeStep={sampleState.index} alternativeLabel>
      {steps.map(label => (
        <Step key={label}>
          <StepLabel
          
          StepIconProps={{
            classes: {
             
              completed: classes.step,
              active: classes.step,
             
            }
          }}
          >{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    </div>  
       </div>
  
  </div>)}
  else{

   

      return (<h1>Done!</h1>)
   
  }

}

const theme2= createMuiTheme({

  palette: {

    primary : {main: '#70C5FF'}
  }
})
class PdfGenerator extends Component{

constructor(props){
    super(props)
  
    this.state = {
        body : '<html><head><title>Boson Innovations</title><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></head><body><script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script><p>hola soy monty</p><img src="https://picsum.photos/700/400?random" class="img-fluid" alt="Responsive image"></body></html>',
        body2 : '',
        value: parseInt(this.props.match.params.ruta,10),
        owner:this.props.match.params.owner,
        patient:this.props.match.params.patient,
        ruta : this.props.match.params.ruta,
        key: 'key',
        loaded: false
        
    }

 store.dispatch({type: 'auth_user', auth_user:{owner: this.state.owner, patient: this.state.patient}})
    this.generatePDF = this.generatePDF.bind(this)
    
}
generatePDF(e) {
    
    fetch('https://v2018.api2pdf.com/chrome/html', {
      method: 'post',
      headers: headers,
      body: JSON.stringify({html: this.state.body2, inlinePdf: true, fileName: 'test.pdf' })
    }).then(res=>res.json())
      .then(
        res => {
          console.log(res);

          const url = window.URL.createObjectURL(new Blob([res.pdf]))
          console.log(url);
          window.open(res.pdf)
          const link = document.createElement('a');
link.href = res.pdf;
document.body.appendChild(link);
link.download= 'hola.pdf';
        } 
     
      
      );
  }
  componentWillMount(){
    axios.post('https://9x835uk4f5.execute-api.us-east-2.amazonaws.com/Dev/expediente', {req: '',id: this.state.patient, patient: this.state.patient}).then((res)=>{

      console.log(res)
      let response = res.data.res
      response = JSON.parse(response)
      let data =response.Item!= null? response.Item.name: null
     
      if (data!=null){
  
        this.setState({Alergias: data.Alergias, age: data.age, checkBox : data.checkBox, datos: data.inp, Otros: data.ots, loaded: true})
        console.log('create Datos')
      }
      else{
      this.setState({loaded:true})
      }
    })
  
  }
componentDidMount(){
 
  
    let a = []
    a.push(pdf.p('hola'))
    a.push(pdf.img("https://picsum.photos/700/400?random"))
    a.push(pdf.div(pdf.p('hola')+pdf.img("https://picsum.photos/700/400?random")))
    let resHTML = '';
    a.map((item, key)=>{
        resHTML = resHTML+item

    })
    console.log(pdf.p('hola'),resHTML, pdf.img("https://picsum.photos/700/400?random"));
    this.setState({body2: resHTML})
    console.log('props', this.state.owner);
    
}

render(){
  /*  '<div style = {{visibility:  'hidden'}}><h1>PDF</h1>
        <button onClick = {this.generatePDF}>Generate</button>
        </div>'*/
        let children = (<div></div>)
        console.log(this.state.datos)
        if(this.state.loaded){
        switch (this.state.value){
          case 0:
              console.log("datos",this.state.age)

            children = ( <BasicTextFields age  = {this.state.age != null?this.state.age:{"Sexo": 'Default', "Estado Civil":'Default'}} Alergias ={this.state.Alergias!= null?this.state.Alergias: {}} checkBox = {this.state.checkBox!=null?this.state.checkBox: {'Tetraciclina': false,'Amoxiciclina': false, 'Acitromicina': false, 'Ciprofloxacino': false,  'Doxiciclina': false, 'Codeína': false, 'Claritomicina': false, 'Sulfonamida': false, 'Penicilina': false}} datos ={this.state.datos != null ? this.state.datos: {}} Otros = {this.state.Otros!=null ? this.state.Otros: {}} patient={this.state.patient} id = 'historia_clinica'
            steps = {['Datos Personales', 'Alergias', 'Otras Alergias', 'hkdsjhkdjhks', 'ksjdhksjhkdj', 'jaksjkasjahks','jashkajhskajshka', '19812098210982']
          }
            props = {{owner: this.state.owner,titles : ['Datos del Paciente'], inputs :[
              {type: 'input',label: 'Nombre', sec: 'datos', index : 0},
               {type: 'input',label: 'Apellido', sec: 'datos',index: 0},
                {type: 'input',label: 'Edad',sec: 'datos', index: 0},
                 {type: 'MS', sec: 'datos',ops : ['Masculino', 'Femenino', 'Otro'],label: 'Sexo', index: 0},
                 {type: 'MS', sec: 'datos',ops : ['Soltero', 'Casado', 'Otro'],label: 'Estado Civil', index: 0},
                 {type: 'input',sec: 'datos', label: 'Dirección', index: 0},
                 {type: 'input', sec: 'datos',label: 'Ciudad', index: 0},
                 {type: 'input', sec: 'datos',label: 'Estado', index: 0},
                 {type: 'input', sec: 'datos',label: 'País', index: 0},
                 {type: 'input', sec: 'datos',label: 'Nacionalidad', index: 0},
                
                 {type: 'title', label: 'Alergias', index : 1},
                 {type: 'B',id: 'med',sec: 'alergias med', label: 'El paciente presenta alergias',cons: 'No', index: 1},
                 {type: 'CheckList',sec: 'alergias prod', label: 'Alergias a Medicamentos ', lista: ['Tetraciclina','Amoxiciclina', 'Acitromicina', 'Ciprofloxacino',  'Doxiciclina', 'Codeína', 'Claritomicina', 'Sulfonamida', 'Penicilina'] ,index: 1},
                 {type: 'CheckList', sec: 'alergias prod',label: '', lista: ['Ibuporfeno','Lidocaína', 'Naproxeno', 'Oxicodona',  'Aspirina', 'Entromicina', 'Yodo', 'Morfina', 'Otros'] ,index: 1},
                 {type: 'B', id : 'otras', sec: 'alergias prod',label: 'El paciente presenta alergia a algún otro producto',cons: 'No', index: 2},
                 {type: 'CheckList',sec: 'alergias prod', label: 'Alergias a productos diarios', lista: ['Huevos','Leche', 'Productos Lacteos'] ,index: 2},
                 {type: 'CheckList',sec: 'alergias prod', label: '', lista: ['Comida de Mar', 'Almendras', 'Otros'] ,index: 2},
                 {type: 'title',  label: 'Historia Clínica', index : 3},
                 {type: 'B', sec: 'Diagnosticos',id: 'med', label: 'El paciente ha sido diagnosticado con alguno de los siguientes padecimientos: ',cons: 'No', index: 3},
                 {type: 'CheckList',  sec: 'Diagnosticos',label: '', lista: ['Reflujo Acido','Coágulos de sangre', 'Enfermedad de la Arteria Coronaria', 'Epilepsia',  'Ataque al corazon', 'Ulcera Estomacal', 'Enfermedad de la tiroides'] ,index: 3},
                 {type: 'CheckList', sec: 'Diagnosticos', label: '', lista: ['Asma','Cancer', 'Diabetes', 'Ataque al corazon',  'Enfermedades de riñon', 'Infarto', 'Otros'] ,index: 3},
                 {type: 'B',id: 'med', sec: 'Cirujias', label: 'El paciente ha tenido procedimientos quirurjicos: ',cons: 'No', index: 4},
                 {type: 'CheckList', sec: 'Cirujias',label: '', lista: ['Angioplastía','Cirujía de Espalda', 'Bypass de corazón', 'Remplazo de cadera',  'Marcapaso', 'Vasectomía'] ,index: 4},
                 {type: 'CheckList', sec: 'Cirujias',label: '', lista: ['Apendectomía','Cirujía vesícula biliar', 'Reparación de Hernia', 'Cirujía de Rodilla',  'Amigdalectnomía', 'Otros'] ,index: 4},
                 {type: 'B',id: 'med',sec: 'Genética', label: 'Historial familiar: ',cons: 'No aplica', index: 5},
                 {type: 'CheckList', sec: 'Genética',label: '', lista: ['Alzheimer','Cáncer', 'Diabetes', 'Colesterol alto',  'Enfermedad del Riñón', 'Osteoporosis', 'Infartos'] ,index: 5},
                 {type: 'CheckList', sec: 'Genética', label: '', lista: ['Asma','Enfermedad de la Arteria Coronada', 'Ataque al corazón', 'Hipertensión',  'Migrañas', 'Otros'] ,index: 5},
                 {type: 'B',id: 'med', styles :{hola:'hola'}, label: 'Uso de sustancias: ',cons: 'No aplica', index: 6},
                
                 {type: 'CheckList', label: 'Uso de sustancias', lista: ['Tabaco','Alcohol', 'Otros'] ,index: 6},
                 {type: 'B',id: 'med', sec: 'Uso de sustancias', label: 'Uso de sustancias ilicitas: ',cons: 'No aplica', index: 6},
                 {type: 'input',  sec: 'Uso de sustancias',label: 'Uso de sustancias Ilicitas', index: 6},
                 {type: 'input',  sec: 'datos medicos',label: 'Temperatura', index: 7},
                 {type: 'input', sec: 'datos medicos',label: 'Tensión Arterial', index: 7},
                 {type: 'input', sec: 'datos medicos',label: 'Frecuencia Cardiaca', index: 7},
                 {type: 'input', sec: 'datos medicos',label: 'Frecuencia Respiratoria', index: 7},
               
    
                 {type: 'multiline_input',sec: 'datos vitales', label: 'Datos Especificos', index: 7}, 
                 {type: 'multiline_input', sec: 'datos medicos',label: 'Resultados previos de Laboratorio', index: 7}, 
                 {type: 'multiline_input', sec: 'datos medicos',label: 'Resultados actuales de Laboratorio', index: 7}, 
                 {type: 'multiline_input', sec: 'datos medicos',label: 'Diagnosticos o Problemas Clínicos', index: 7},  
                 {type: 'multiline_input', sec: 'datos medicos',label: 'Pronóstico', index: 7},    
                 {type: 'multiline_input', sec: 'datos medicos',label: 'Indicación Terapeutica', index: 7},         
                         
    
    
                
            
            
            ] }}/>)
            break;
          case 1: 
            children =(<BasicTextFields2 pat={this.state.patient} id = 'Nota_de_evolucion' props = {{owner: this.state.owner,titles : ['Datos del Paciente'], inputs :[
              {type: 'input',label: 'Nombre', index : 0},
               {type: 'input',label: 'Apellido', index: 0},
                {type: 'input',label: 'Edad', index: 0},
                 {type: 'MS', ops : ['Masculino', 'Femenino', 'Otro'],label: 'Sexo', index: 0},
                 {type: 'MS', ops : ['Soltero', 'Casado', 'Otro'],label: 'Estado Civil', index: 0},
                 {type: 'input', label: 'Dirección', index: 0},
                 {type: 'input', label: 'Ciudad', index: 0},
                 {type: 'input', label: 'Estado', index: 0},
                 {type: 'input', label: 'País', index: 0},
                 {type: 'input', label: 'Nacionalidad', index: 0},
                
                 {type: 'title', label: 'Alergias', index : 1},
                 {type: 'B',id: 'med', label: 'El paciente presenta alergias',cons: 'No', index: 1},
                 {type: 'CheckList', label: 'Alergias a Medicamentos ', lista: ['Tetraciclina','Amoxiciclina', 'Acitromicina', 'Ciprofloxacino',  'Doxiciclina', 'Codeína', 'Claritomicina', 'Sulfonamida', 'Penicilina'] ,index: 1},
                 {type: 'CheckList', label: '', lista: ['Ibuporfeno','Lidocaína', 'Naproxeno', 'Oxicodona',  'Aspirina', 'Entromicina', 'Yodo', 'Morfina', 'Otros'] ,index: 1},
                 {type: 'B', id : 'otras',label: 'El paciente presenta alergia a algún otro producto',cons: 'No', index: 2},
                 {type: 'CheckList', label: 'Alergias a productos diarios', lista: ['Huevos','Leche', 'Productos Lacteos'] ,index: 2},
                 {type: 'CheckList', label: '', lista: ['Comida de Mar', 'Almendras', 'Otros'] ,index: 2},
                 {type: 'title', label: 'Historia Clínica', index : 3},
                 {type: 'B',id: 'med', label: 'El paciente ha sido diagnosticado con alguno de los siguientes padecimientos: ',cons: 'No', index: 3},
                 {type: 'CheckList', label: '', lista: ['Reflujo Acido','Coágulos de sangre', 'Enfermedad de la Arteria Coronaria', 'Epilepsia',  'Ataque al corazon', 'Ulcera Estomacal', 'Enfermedad de la tiroides'] ,index: 3},
                 {type: 'CheckList', label: '', lista: ['Asma','Cancer', 'Diabetes', 'Ataque al corazon',  'Enfermedades de riñon', 'Infarto', 'Otros'] ,index: 3},
                 {type: 'B',id: 'med', label: 'El paciente ha tenido procedimientos quirurjicos: ',cons: 'No', index: 4},
                 {type: 'CheckList', label: '', lista: ['Angioplastía','Cirujía de Espalda', 'Bypass de corazón', 'Remplazo de cadera',  'Marcapaso', 'Vasectomía'] ,index: 4},
                 {type: 'CheckList', label: '', lista: ['Apendectomía','Cirujía vesícula biliar', 'Reparación de Hernia', 'Cirujía de Rodilla',  'Amigdalectnomía', 'Otros'] ,index: 4},
                 {type: 'B',id: 'med', label: 'Historial familiar: ',cons: 'No aplica', index: 5},
                 {type: 'CheckList', label: '', lista: ['Alzheimer','Cáncer', 'Diabetes', 'Colesterol alto',  'Enfermedad del Riñón', 'Osteoporosis', 'Infartos'] ,index: 5},
                 {type: 'CheckList', label: '', lista: ['Asma','Enfermedad de la Arteria Coronada', 'Ataque al corazón', 'Hipertensión',  'Migrañas', 'Otros'] ,index: 5},
                 {type: 'B',id: 'med', styles :{hola:'hola'}, label: 'Uso de sustancias: ',cons: 'No aplica', index: 6},
                
                 {type: 'CheckList', label: 'Uso de sustancias', lista: ['Tabaco','Alcohol', 'Otros'] ,index: 6},
                 {type: 'B',id: 'med', label: 'Uso de sustancias ilicitas: ',cons: 'No aplica', index: 6},
                 {type: 'input', label: 'Uso de sustancias Ilicitas', index: 6},
                 {type: 'input', label: 'Temperatura', index: 7},
                 {type: 'input', label: 'Tensión Arterial', index: 7},
                 {type: 'input', label: 'Frecuencia Cardiaca', index: 7},
                 {type: 'input', label: 'Frecuencia Respiratoria', index: 7},
               
    
                 {type: 'multiline_input', label: 'Datos Especificos', index: 7}, 
                 {type: 'multiline_input', label: 'Resultados previos de Laboratorio', index: 7}, 
                 {type: 'multiline_input', label: 'Resultados actuales de Laboratorio', index: 7}, 
                 {type: 'multiline_input', label: 'Diagnosticos o Problemas Clínicos', index: 7},  
                 {type: 'multiline_input', label: 'Pronóstico', index: 7},    
                 {type: 'multiline_input', label: 'Indicación Terapeutica', index: 7},         
                         
    
    
                
            
            
            ] }}/>)
          break;
          case 2:
            children = (<BasicTextFields3 id = 'Nota de Interconsulta' props = {{owner: this.state.owner,titles : ['Datos del Paciente'], inputs :[
              {type: 'input',label: 'Nombre', index : 0},
               {type: 'input',label: 'Apellido', index: 0},
                {type: 'input',label: 'Edad', index: 0},
                 {type: 'MS', ops : ['Masculino', 'Femenino', 'Otro'],label: 'Sexo', index: 0},
                 {type: 'MS', ops : ['Soltero', 'Casado', 'Otro'],label: 'Estado Civil', index: 0},
                 {type: 'input', label: 'Dirección', index: 0},
                 {type: 'input', label: 'Ciudad', index: 0},
                 {type: 'input', label: 'Estado', index: 0},
                 {type: 'input', label: 'País', index: 0},
                 {type: 'input', label: 'Nacionalidad', index: 0},
                
                 {type: 'title', label: 'Alergias', index : 1},
                 {type: 'B',id: 'med', label: 'El paciente presenta alergias',cons: 'No', index: 1},
                 {type: 'CheckList', label: 'Alergias a Medicamentos ', lista: ['Tetraciclina','Amoxiciclina', 'Acitromicina', 'Ciprofloxacino',  'Doxiciclina', 'Codeína', 'Claritomicina', 'Sulfonamida', 'Penicilina'] ,index: 1},
                 {type: 'CheckList', label: '', lista: ['Ibuporfeno','Lidocaína', 'Naproxeno', 'Oxicodona',  'Aspirina', 'Entromicina', 'Yodo', 'Morfina', 'Otros'] ,index: 1},
                 {type: 'B', id : 'otras',label: 'El paciente presenta alergia a algún otro producto',cons: 'No', index: 2},
                 {type: 'CheckList', label: 'Alergias a productos diarios', lista: ['Huevos','Leche', 'Productos Lacteos'] ,index: 2},
                 {type: 'CheckList', label: '', lista: ['Comida de Mar', 'Almendras', 'Otros'] ,index: 2},
                 {type: 'title', label: 'Historia Clínica', index : 3},
                 {type: 'B',id: 'med', label: 'El paciente ha sido diagnosticado con alguno de los siguientes padecimientos: ',cons: 'No', index: 3},
                 {type: 'CheckList', label: '', lista: ['Reflujo Acido','Coágulos de sangre', 'Enfermedad de la Arteria Coronaria', 'Epilepsia',  'Ataque al corazon', 'Ulcera Estomacal', 'Enfermedad de la tiroides'] ,index: 3},
                 {type: 'CheckList', label: '', lista: ['Asma','Cancer', 'Diabetes', 'Ataque al corazon',  'Enfermedades de riñon', 'Infarto', 'Otros'] ,index: 3},
                 {type: 'B',id: 'med', label: 'El paciente ha tenido procedimientos quirurjicos: ',cons: 'No', index: 4},
                 {type: 'CheckList', label: '', lista: ['Angioplastía','Cirujía de Espalda', 'Bypass de corazón', 'Remplazo de cadera',  'Marcapaso', 'Vasectomía'] ,index: 4},
                 {type: 'CheckList', label: '', lista: ['Apendectomía','Cirujía vesícula biliar', 'Reparación de Hernia', 'Cirujía de Rodilla',  'Amigdalectnomía', 'Otros'] ,index: 4},
                 {type: 'B',id: 'med', label: 'Historial familiar: ',cons: 'No aplica', index: 5},
                 {type: 'CheckList', label: '', lista: ['Alzheimer','Cáncer', 'Diabetes', 'Colesterol alto',  'Enfermedad del Riñón', 'Osteoporosis', 'Infartos'] ,index: 5},
                 {type: 'CheckList', label: '', lista: ['Asma','Enfermedad de la Arteria Coronada', 'Ataque al corazón', 'Hipertensión',  'Migrañas', 'Otros'] ,index: 5},
                 {type: 'B',id: 'med', styles :{hola:'hola'}, label: 'Uso de sustancias: ',cons: 'No aplica', index: 6},
                
                 {type: 'CheckList', label: 'Uso de sustancias', lista: ['Tabaco','Alcohol', 'Otros'] ,index: 6},
                 {type: 'B',id: 'med', label: 'Uso de sustancias ilicitas: ',cons: 'No aplica', index: 6},
                 {type: 'input', label: 'Uso de sustancias Ilicitas', index: 6},
                 {type: 'input', label: 'Temperatura', index: 7},
                 {type: 'input', label: 'Tensión Arterial', index: 7},
                 {type: 'input', label: 'Frecuencia Cardiaca', index: 7},
                 {type: 'input', label: 'Frecuencia Respiratoria', index: 7},
               
    
                 {type: 'multiline_input', label: 'Datos Especificos', index: 7}, 
                 {type: 'multiline_input', label: 'Resultados previos de Laboratorio', index: 7}, 
                 {type: 'multiline_input', label: 'Resultados actuales de Laboratorio', index: 7}, 
                 {type: 'multiline_input', label: 'Diagnosticos o Problemas Clínicos', index: 7},  
                 {type: 'multiline_input', label: 'Pronóstico', index: 7},    
                 {type: 'multiline_input', label: 'Indicación Terapeutica', index: 7},         
                         
    
    
                
            
            
            ] }}/>)
            break;
            case 3:
            children = (<BasicTextFields4 id = 'Nota_de_referencia' props = {{owner: this.state.owner,titles : ['Datos del Paciente'], inputs :[
              {type: 'input',label: 'Nombre', index : 0},
               {type: 'input',label: 'Apellido', index: 0},
                {type: 'input',label: 'Edad', index: 0},
                 {type: 'MS', ops : ['Masculino', 'Femenino', 'Otro'],label: 'Sexo', index: 0},
                 {type: 'MS', ops : ['Soltero', 'Casado', 'Otro'],label: 'Estado Civil', index: 0},
                 {type: 'input', label: 'Dirección', index: 0},
                 {type: 'input', label: 'Ciudad', index: 0},
                 {type: 'input', label: 'Estado', index: 0},
                 {type: 'input', label: 'País', index: 0},
                 {type: 'input', label: 'Nacionalidad', index: 0},
                
                 {type: 'title', label: 'Alergias', index : 1},
                 {type: 'B',id: 'med', label: 'El paciente presenta alergias',cons: 'No', index: 1},
                 {type: 'CheckList', label: 'Alergias a Medicamentos ', lista: ['Tetraciclina','Amoxiciclina', 'Acitromicina', 'Ciprofloxacino',  'Doxiciclina', 'Codeína', 'Claritomicina', 'Sulfonamida', 'Penicilina'] ,index: 1},
                 {type: 'CheckList', label: '', lista: ['Ibuporfeno','Lidocaína', 'Naproxeno', 'Oxicodona',  'Aspirina', 'Entromicina', 'Yodo', 'Morfina', 'Otros'] ,index: 1},
                 {type: 'B', id : 'otras',label: 'El paciente presenta alergia a algún otro producto',cons: 'No', index: 2},
                 {type: 'CheckList', label: 'Alergias a productos diarios', lista: ['Huevos','Leche', 'Productos Lacteos'] ,index: 2},
                 {type: 'CheckList', label: '', lista: ['Comida de Mar', 'Almendras', 'Otros'] ,index: 2},
                 {type: 'title', label: 'Historia Clínica', index : 3},
                 {type: 'B',id: 'med', label: 'El paciente ha sido diagnosticado con alguno de los siguientes padecimientos: ',cons: 'No', index: 3},
                 {type: 'CheckList', label: '', lista: ['Reflujo Acido','Coágulos de sangre', 'Enfermedad de la Arteria Coronaria', 'Epilepsia',  'Ataque al corazon', 'Ulcera Estomacal', 'Enfermedad de la tiroides'] ,index: 3},
                 {type: 'CheckList', label: '', lista: ['Asma','Cancer', 'Diabetes', 'Ataque al corazon',  'Enfermedades de riñon', 'Infarto', 'Otros'] ,index: 3},
                 {type: 'B',id: 'med', label: 'El paciente ha tenido procedimientos quirurjicos: ',cons: 'No', index: 4},
                 {type: 'CheckList', label: '', lista: ['Angioplastía','Cirujía de Espalda', 'Bypass de corazón', 'Remplazo de cadera',  'Marcapaso', 'Vasectomía'] ,index: 4},
                 {type: 'CheckList', label: '', lista: ['Apendectomía','Cirujía vesícula biliar', 'Reparación de Hernia', 'Cirujía de Rodilla',  'Amigdalectnomía', 'Otros'] ,index: 4},
                 {type: 'B',id: 'med', label: 'Historial familiar: ',cons: 'No aplica', index: 5},
                 {type: 'CheckList', label: '', lista: ['Alzheimer','Cáncer', 'Diabetes', 'Colesterol alto',  'Enfermedad del Riñón', 'Osteoporosis', 'Infartos'] ,index: 5},
                 {type: 'CheckList', label: '', lista: ['Asma','Enfermedad de la Arteria Coronada', 'Ataque al corazón', 'Hipertensión',  'Migrañas', 'Otros'] ,index: 5},
                 {type: 'B',id: 'med', styles :{hola:'hola'}, label: 'Uso de sustancias: ',cons: 'No aplica', index: 6},
                
                 {type: 'CheckList', label: 'Uso de sustancias', lista: ['Tabaco','Alcohol', 'Otros'] ,index: 6},
                 {type: 'B',id: 'med', label: 'Uso de sustancias ilicitas: ',cons: 'No aplica', index: 6},
                 {type: 'input', label: 'Uso de sustancias Ilicitas', index: 6},
                 {type: 'input', label: 'Temperatura', index: 7},
                 {type: 'input', label: 'Tensión Arterial', index: 7},
                 {type: 'input', label: 'Frecuencia Cardiaca', index: 7},
                 {type: 'input', label: 'Frecuencia Respiratoria', index: 7},
               
    
                 {type: 'multiline_input', label: 'Datos Especificos', index: 7}, 
                 {type: 'multiline_input', label: 'Resultados previos de Laboratorio', index: 7}, 
                 {type: 'multiline_input', label: 'Resultados actuales de Laboratorio', index: 7}, 
                 {type: 'multiline_input', label: 'Diagnosticos o Problemas Clínicos', index: 7},  
                 {type: 'multiline_input', label: 'Pronóstico', index: 7},    
                 {type: 'multiline_input', label: 'Indicación Terapeutica', index: 7},         
                         
    
    
                
            
            
            ] }}/>)
            break;
           default:
             children = (<div>Error!</div>)
             break;
          }
        } 
        
        
         
    return (
    
    
    
    <div style = {{textAlign: 'center', width:  '100vw', height: '95vh'}}>
     
      
              <div style = {{backgroundColor: '#eeeeee' , marginBottom: '1.5%'}}>
                <MuiThemeProvider theme  = {theme2}>
                 
        <Tabs
        value={this.state.value}
        onChange={(evt, newValue)=>{
            console.log(newValue, evt.target.innerHTML)
            let link = newValue
            //let a = document.createElement('a')
            //a.href = '/PdfGenerator/'+ this.state.key+'/'+this.state.owner+'/'+this.state.patient+'/'+link
            //a.click()
            this.setState({value: newValue})

           
        }}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab color ="primary" label="Historia Clínica" />
        <Tab label="Nota de Evolución" />
        <Tab label="Nota de Interconsulta" />
        <Tab label="Nota de Referencia" />
     
      </Tabs>
      </MuiThemeProvider>
      </div>
      {children}
       
        
        </div>
    
    
    )
}
}

export default PdfGenerator
