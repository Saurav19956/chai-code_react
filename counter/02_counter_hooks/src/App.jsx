import { useState } from 'react';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //let counter = 15;
  let [counter, setCounter] = useState(15)
  const addValue = ()=>{
    //console.log('counter', Math.random());
    
    //counter = counter + 1;
    setCounter(counter+1)
    // console.log('counter',counter);
  }

  return (
    <>
      <h2>counter value: {counter}</h2>
      <button onClick={addValue}>Addvalue</button>
      <br/>
      <button>Remove Value</button>
      <p> footer : {counter}</p>
    </>
  )
}

export default App
