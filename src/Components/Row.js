import React from 'react';
import { useState, useEffect, useRef } from 'react';






// const Cell = ({ char }) => {

//   return (
//     <div
//       style={{
//         border: '1px solid black',
//         width: '30px',
//         height: '30px',
//         display: 'grid',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       {char}
//     </div>
//   )
// }

const Row = ({ max, input_word }) => {
  const [word, setword] = useState([])
  const [locked, setLocked] = useState(false)
  const max_letters = max
  //5 letters no spaces exists in words 
  //and only then we can pass it to our logic 


  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   if (locked) {
  //     return;
  //   }
  //   if (value.length <= max_letters) {
  //     setword(value);
  //   }

  //   setword(e.target.value);
  // };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.length === max_letters && word.indexOf(" ") === -1) {
      console.log("word is valid", word.length)
      setLocked(true)
      const newWord = word.join("")
      input_word(newWord)
    } else {
      console.log("word is not valid", word.length)
    }
  };


  const handleKeyDown = (e) => {
    // Check if the pressed key is Enter (key code 13)
    if (e.key === 'Enter') {

      handleSubmit(e);
    }
  };



  const handleBackspace = (index, e) => {
    if (locked) return;
    if (index > 0) {
      e.target.value = "";
      setword(prevWord => [...prevWord.slice(0, -1)]);

      inputRefs.current[index - 1].current.focus();
    }
  };
  const cells = Array.from({ length: 5 }); // Number of cells
  const inputRefs = useRef(cells.map(() => React.createRef()));

  const handleInputChange = (index, e) => {
    const value = e.target.value;

    if (locked) {
      return;
    }
    if (word.length <= max_letters) {
      console.log(word, value)
      setword(prevWord => [...prevWord, value]);
    }

    if (index < inputRefs.current.length - 1) {

      inputRefs.current[index + 1].current.focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0].current.focus(); // Focus on the first input field initially
  }, []);



  return (
    <div className="row">
      {/* <input type="text" value={word} maxLength={max_letters} onKeyDown={handleKeyDown} onChange={handleInputChange} /> */}
      {cells.map((char, index) => (
        <input
          key={index}
          ref={inputRefs.current[index]}
          type="text"
          maxLength="1"
          className="wordle-cell"
          onChange={(e) => handleInputChange(index, e)}


          onKeyDown={(e) => {
            if (e.key === 'Backspace') handleBackspace(index, e)
            if (e.key === 'Enter') handleKeyDown(e)

          }}
        />
      ))}
    </div>
  );
};

export default Row;
