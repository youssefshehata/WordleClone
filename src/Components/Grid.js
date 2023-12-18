import React, { useState } from 'react';
import Row from './Row';

const Grid = ({ actualword, won, setWon }) => {

  const [colorHistory, setColorHistory] = useState({})
  const [keyboardHistory, setkeyboardHistory] = useState({})

  const [wordHistory, setWordHistory] = useState({})
  const [current, setCurrent] = useState(0)
  const submission = (data) => {
    // Do something with the data in the parent component
    console.log('Received data from child:', data);
    setCurrent(data);
  };



  return (

    <div className="grid">


      <Row idx={0} max={5} actualword={actualword} won={won} setWon={setWon} current={current} sendSub={submission} keyboardHistory={colorHistory} setkeyboardHistory={setColorHistory} wordHistory={wordHistory} setWordHistory={setWordHistory} />
      <Row idx={1} max={5} actualword={actualword} won={won} setWon={setWon} current={current} sendSub={submission} keyboardHistory={colorHistory} setkeyboardHistory={setColorHistory} wordHistory={wordHistory} setWordHistory={setWordHistory} />
      <Row idx={2} max={5} actualword={actualword} won={won} setWon={setWon} current={current} sendSub={submission} keyboardHistory={colorHistory} setkeyboardHistory={setColorHistory} wordHistory={wordHistory} setWordHistory={setWordHistory} />
      <Row idx={3} max={5} actualword={actualword} won={won} setWon={setWon} current={current} sendSub={submission} keyboardHistory={colorHistory} setkeyboardHistory={setColorHistory} wordHistory={wordHistory} setWordHistory={setWordHistory} />
      <Row idx={4} max={5} actualword={actualword} won={won} setWon={setWon} current={current} sendSub={submission} keyboardHistory={colorHistory} setkeyboardHistory={setColorHistory} wordHistory={wordHistory} setWordHistory={setWordHistory} />
      <Row idx={5} max={5} actualword={actualword} won={won} setWon={setWon} current={current} sendSub={submission} keyboardHistory={colorHistory} setkeyboardHistory={setColorHistory} wordHistory={wordHistory} setWordHistory={setWordHistory} />

      {/* Your grid content goes here */}
    </div>
  );
};

export default Grid;
