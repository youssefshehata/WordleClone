import React from 'react';
import Row from './Row';

const Grid = ({ actualword, setWon }) => {


  const handle_choice = (word) => {


    if (word === actualword) {
      setWon(true)
    }
  }
  return (
    <div className="grid">
      <Row max={5} input_word={handle_choice} />
      <Row max={5} input_word={handle_choice} />
      <Row max={5} input_word={handle_choice} />
      <Row max={5} input_word={handle_choice} />
      <Row max={5} input_word={handle_choice} />

      {/* Your grid content goes here */}
    </div>
  );
};

export default Grid;
