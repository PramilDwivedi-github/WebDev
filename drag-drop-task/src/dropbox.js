import React,{useEffect} from  'react';
import {useDropzone} from 'react-dropzone';
import {parse} from 'papaparse';
import './dropbox.css';


const DropBox = ({page,onRouteChange})=>{
    const temp = [];
    useEffect(()=>{},[page]);

    const {acceptedFiles,getRootProps,getInputProps} = useDropzone({accept:'.csv'},)

    const displayFiles = acceptedFiles.map(file => 
      (<li key={file.path}>
        {file.path}
      </li>)
      );


    const LoadData = ()=>{
      acceptedFiles.forEach(async file=>{
        const text = await file.text();
        const result = parse(text).data;
        temp[`${file.name}`] = result;
      })
    }
    

    const uploadHandle = ()=>{
        LoadData();
        fetch('http://localhost:3000/addFiles',{
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify({
                data:temp
            }),
        }).then(resp=>resp.json())
        .catch(error=>console.log(error))

        onRouteChange();
    }
    
  
    return (
                
                page?
        <div id = "box" >
            <div id = "dragbox" {...getRootProps({className:'dropzone'})}>
                <input {...getInputProps()}/>
                <p>Drag n drop files or click here to select</p>
  
                <p>Selected Files</p>
                <ul>{displayFiles}</ul>
                
            </div>
            <button onClick={uploadHandle}>Upload</button>
        </div>
                :
            <div id = "box">
                <h2>uploaded files</h2>
                <ul>{displayFiles}</ul>
            </div>                         
    );
}

export default DropBox;