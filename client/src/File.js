import React from 'react'

function File(props){
  return (
    <div className="files">
      <div className="progress">
        <div style={props.styles} className="progress-bar progress-bar-striped progress-bar-animated bg-success"></div>
      </div>
      <p className="filename">{props.file && props.file.name}</p>
      <p className="filesize">{props.file ? Math.round(props.file.size/1000000) + " MB" : "" }</p>
      </div>
  )
}

export default File
