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
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-gray-800 to-gray-900">
      {/* Styled Heading */}
      <h1 className="absolute top-16 text-5xl font-extrabold text-white tracking-wide drop-shadow-lg hover:text-pink-400 transition-all duration-300 ease-in-out transform hover:scale-105 font-serif">
        Password Generator
      </h1>
  
      {/* Password Generator Div */}
      <div className="w-full max-w-lg mx-auto shadow-xl rounded-xl px-8 py-6 bg-gradient-to-br from-pink-500 to-red-400 text-white font-semibold text-lg relative">
        {/* Input and Copy Section */}
        <div className="flex shadow-md rounded-lg overflow-hidden mb-6 bg-white">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 text-gray-700"
            placeholder="Your Password"
            readOnly
            ref={passwordref}
          />
          <button
            onClick={copyPasswordtoclipboard}
            className="outline-none bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 transition-all duration-300"
          >
            Copy
          </button>
        </div>
  
        {/* Range Slider and Checkbox Options */}
        <div className="flex flex-col gap-y-4">
          {/* Length Slider */}
          <div className="flex items-center justify-between text-sm">
            <label className="text-white font-bold text-lg">Password Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-3/4"
              onChange={(e) => setlength(e.target.value)}
            />
          </div>
  
          {/* Options */}
          <div className="flex gap-x-4">
            {/* Numbers Checkbox */}
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                defaultChecked={numallow}
                id="numberInput"
                onChange={() => {
                  setnumallow((prev) => !prev);
                }}
                className="cursor-pointer w-4 h-4"
              />
              <label className="text-white">Include Numbers</label>
            </div>
  
            {/* Characters Checkbox */}
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                defaultChecked={charallow}
                id="characterInput"
                onChange={() => {
                  setcharallow((prev) => !prev);
                }}
                className="cursor-pointer w-4 h-4"
              />
              <label className="text-white">Include Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default App
