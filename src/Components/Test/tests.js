import React,{Component} from 'react'
import axios from 'axios'

class HttpExample extends Component{

  ClickHandler(){

    axios.post('https://herokudjangoapp314.herokuapp.com/test/', {data: [[1,1,1],[1,1,1],[1,1,1]]})
          .then((res)=>{
                console.log(res.data)
        })
      }





  render(){

    return (<button onClick = {this.ClickHandler}>Http Request test</button>)
  }
  }


export default HttpExample;
