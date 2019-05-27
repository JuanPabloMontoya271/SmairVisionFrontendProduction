import React, {Component} from 'react'
import Plot from 'react-plotly.js';


class Display extends Component{
  constructor(props){
    super(props);

    //Reacts dicom-img element reference to load image

  }

  render(){
  
    return (


      <Plot
        data={[
          {
            z: [[1,2,3],[2,1,3],[3,2,1]],
            type: 'heatmap'
          },
        ]}
        layout={{width: 300, height: 300, title: 'A Fancy Plot'}}
      />


    )
  }
  }


export default Display;
