import React from 'react'
import File from './File.js'
import axios from 'axios'

class UploadForm extends React.Component {
  constructor(){
    super()
    this.state={
      files:[],
      filename:"Choose file",
      uploadedFile: null,
      filepath: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    console.log(event, event.target.files)
    const {files} = event.target
    this.setState({
      files: files,
      uploadedFile: files[0],
      filename: files[0].name
    })
  }

async  handleSubmit(event){
    event.preventDefault()
    const formData = new FormData();
    formData.append('file', this.state.uploadedFile);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {console.log(res)});

      const{ file, fileName, filePath} = res.data;

      this.setState({
          uploadedFile: file,
          filename: fileName,
          filepath: filePath
        });
        console.log(this.state.uploadedFile)

    } catch(err) {
      if(err.response && err.response.status === 500){
        console.log('There was a server problem')
      } else {
        console.log(err);
      }
    }
  }

  render(){
    const styles = {width: "0%"}
    return(
      <div className="container uploader">

        <form className="form-group" onSubmit={this.handleSubmit}>
        <div className="custom-file">
          <input
              className="custom-file-input"
              type="file"
              name="file"
              onChange={this.handleChange}
              />
          <label className="custom-file-label">{this.state.filename}</label>
        </div>
          <File style={styles} file={this.state.uploadedFile}/>
          <button className="btn btn-primary" type="submit">Save</button>
        </form>

      </div>
    )
  }
}

export default UploadForm
