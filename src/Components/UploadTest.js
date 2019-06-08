import React, {Component} from 'react'
import Plot from 'react-plotly.js';
import S3FileUpload from 'react-s3'


const config ={
  bucketName: 'bucketdeprueba314',
  /* optional */
 region: 'us-east-2',
 accessKeyId: 'AKIA33SE4OYZBDB4RDY5',
 secretAccessKey: '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',




}
class UploadTest extends Component{
  constructor(props){
    super(props);

    //Reacts dicom-img element reference to load image

  }
  upload (e) {

    console.log(e.target.files[0])



    let file = e.target.files[0]

    S3FileUpload.uploadFile(file, config)
    .then((data)=>{
        console.log(data);

    })
    .catch((err)=>{



      alert(err)
    })
  }

  render(){

    return (

      <div>
      <h1>Upload Test</h1>
      <input type='file' onChange = {this.upload}/>
      </div>

    )
  }
  }


export default UploadTest;
