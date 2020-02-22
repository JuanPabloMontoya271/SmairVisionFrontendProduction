import React, { Component} from 'react';
import { Page, Text, View, Document, StyleSheet,Canvas, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#ffffff'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    header:{
      width: "100%",
      height: "10%",
      backgroundColor: "#000000",
      color: '#ffffff',
      textAlign: 'center', 
      padding: "10px",
     

    },
    body:{
      position: "absolute",
      top: "10%",
      width: '100%',
      height: '20%',
      backgroundColor:"red",
    
    }
    
  });
  const MyDocument = (props) => (
    <Document>
       <Page size="A4" style={styles.page}>
         <View style = {styles.header}>
         <Text >Reporte Clínico</Text>
            
          

         </View>
         <View style = {styles.body}>
         <Text >Imagen</Text>
            
          <View style = {{width: '70%',height:'100%', backgroundColor:'blue', position: 'absolute', textAlign: "center", right: "0%"}}>

          <Text style ={{position: 'absolute'}}>Datos del Paciente</Text>
            
          </View>
          
          </View>
          
       </Page>
      
    </Document>
  );

  export default class GenerateReport extends Component{
    constructor(props){
      super(props)
    
    
    }
    
    render(){

      return (

        <div style ={{width: "50%", backgroundColor: '#000000', height: "100%", position: "relative", left: '25%', top:0}}>   
        <PDFViewer width = "100%" height = "100%">
       <MyDocument />
     </PDFViewer>
     </div>
        )
    }
    
  }
    

