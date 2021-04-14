import { fireEvent } from '@testing-library/dom';
import DropBox from './dropbox';
import React from 'react';
import './App.css';

function App() {
  const [page,setPage] = React.useState(true);

  const onRouteChange =()=>{
      setPage(!page);
  }
  return (<div className = "App">

    <div id = "header"><h2> Darg and Drop</h2></div>
    <br></br>
    <DropBox page={page} onRouteChange={onRouteChange}/>
  </div>);
}

export default App;
