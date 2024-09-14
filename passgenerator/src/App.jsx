import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length , setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // useRef
  const passwordRef = useRef(null);

  const generatePassword = useCallback(()=>{

    let pass = '';
    let str =  'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnm';
    if(numberAllowed) str+= '0987654321';
    if(charAllowed) str+= ')(*&^%$#@!';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
      //console.log('pass', pass)
      
    }
    setPassword(pass)
  }, [length,numberAllowed, charAllowed, setPassword]);

  const copyPasswordClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  },[password])
    
    useEffect(()=>{
      generatePassword()
    }, [length, numberAllowed, charAllowed, generatePassword])

  return (
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-1 my-8 text-orange-700 bg-gray-700'>
      <h1 className='text-center my-2 text-white '>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
        <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password'
         readOnly
         ref={passwordRef} />
        <button  className='outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordClipboard}
        > copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>setLength(e.target.value)}/>
          <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' onChange={()=>{
            setNumberAllowed((prev)=> !prev)
          }} />
          <label >Number</label>
          <div className='flex text-center gap-x-1'>
            <input type='checkbox' defaultChecked={charAllowed} id='charcterInput' onChange={()=>{
              setCharAllowed((prev)=> !prev)
            }} />
            <label>Character</label>
          </div>
          </div>
        </div>
      </div>
  )
}

export default App
