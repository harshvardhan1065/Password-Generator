import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(10)
  const [char, setChar] = useState(false)
  const [num, setNum] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGen = useCallback(() => {
      var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      var pass = ""

      if(num) str += "0123456789"
      if(char) str += "!@#$&-_"

      for(var i = 0; i<length; i++ ){
        var c = Math.floor(Math.random() * str.length + 1)

        pass += str.charAt(c) 
      }

      setPassword(pass)

    },
    [length, char, num ],
  )

  useEffect(() => {
    passwordGen()
  }, [length, num, char ])
  

  const copyPassword = useCallback(() => {

    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)

  },[password])
  

  return (
    <>
      <div className=' w-full max-w-md bg-slate-600 text-orange-300 font-medium text-xl mx-auto p-4 rounded-md shadow-md'>Password Generator
        <div className=' flex shadow overflow-hidden rounded-md m-4'>
        <input type="text" placeholder='Password' value={password} readOnly ref={passwordRef} className='w-full outline-none'/>
        <button className=' text-slate-100 bg-blue-600 px-3 py-1' onClick={copyPassword}>copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={5}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>


          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={num}
              id="numberInput"
              onChange={() => {
                  setNum((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>


          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={char}
              id="characterInput"
              onChange={() => {
                setChar((prev) => !prev )
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
