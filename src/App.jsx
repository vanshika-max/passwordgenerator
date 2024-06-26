import { useRef } from 'react'
import { useEffect } from 'react'
import { useState ,useCallback} from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numallow,setnumallow]=useState(false)
  const [charallow,setcharallow]=useState(false)
  const [password,setpass]=useState("")
  //ref hook

  const passwordref=useRef(null)

  const passwordgenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallow){
          str+="0123456789"
    }
    if(charallow){
          str+="!@#$%^&*_-+=[]{}~`"
    }
    for(let i=1;i<=length;i++){
         let char=Math.floor(Math.random()*str.length+1)
         pass+=str.charAt(char)
    }
    setpass(pass)
  },[length,numallow,charallow,setpass])

  const copyPasswordtoclipboard=useCallback(()=>{
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordgenerator()
  },[length,numallow,charallow,passwordgenerator])


  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-5 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordref}
          />
          <button
           onClick={copyPasswordtoclipboard}
           
          className='outline-none bg-blue-700 text-white px-3 py-1.5 shrink-0'
          >copy</button>

         
        </div>
        <div className='flex test-sm gap-x-2'>
             <div className='flex items-center gap-x-1'>
             <input type='range' 
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setlength(e.target.value)}}/>
              <label>length:{length}</label>
             </div>
             <div className='flex items-center gap-x-1'>
               <label>Numbers</label>
                <input
                type='checkbox'
                defaultChecked={numallow}
                id="numberInput"
                onChange={()=>{
                  setnumallow((prev)=>!prev)
                }}
                />
             </div>
             <div className='flex items-center gap-x-1'>
               <label >Characters</label>
                <input
                type='checkbox'
                defaultChecked={charallow}
                id="characterInput"
                onChange={()=>{
                  setcharallow((prev)=>!prev)
                }}
                />
             </div>
        </div>
    </div>
    </>
  )
}

export default App
