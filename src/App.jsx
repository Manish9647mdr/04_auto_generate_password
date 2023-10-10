import { useCallback, useState, useEffect, useRef } from "react";



function App() {
  // variable define for password length
  const [length, setLength] = useState(8);
  // variable define for number allowed or not into the password value
  const [numberAllowed, setNumberAllowed] = useState(false);
  // variable define for character(e.g!#$%&'+*) allowed or not into the password value
  const [charAllowed, setCharAllowed] = useState(false);
  // variable define for password
  const [password, setPassword] = useState();

  // useRef hook
  const passwordRef = useRef(null)

  // password generator function using useCallBack method
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";

    // If number is allowed=ture, then add with string variable 'str'
    if (numberAllowed) str += "0123456789";
    // If char is allowed=true, then add with string variable 'str'
    if (charAllowed) str += "!#$%&-~*+{}[]";
    // for loop for the random str.length generate and store in the 'char' variable
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      // generate str.lenth equal str value store into 'pass' variable
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,30)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shado-md rounded-lg px-4 my-8 text-orange-400 bg-gray-500">
        <h1 className="text-xl text-center text-white my-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="ouline-none bg-green-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 py-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={25}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
