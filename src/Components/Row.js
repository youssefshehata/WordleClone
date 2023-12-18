import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const Row = ({ idx, max, actualword, won, setWon, current, sendSub, keyboardHistory, setkeyboardHistory, wordHistory, setWordHistory }) => {
  const [submited, setSubmitted] = useState(false);
  const [word, setWord] = useState([]);
  const [locked, setLocked] = useState(false);
  const max_letters = max;
  const indexColor = (char, index, actualword) => {
    if (idx !== current) return;

    if (actualword[index] === char) return 'green';

    if (actualword.indexOf(char) !== -1) return 'orange';

    return '';
  };

  useEffect(() => {
    if (idx !== current) return;


    const handleKeyInput = (e) => {
      if (locked || won) return;
      if (e.key === 'Backspace') {
        setWord(prevWord => prevWord.slice(0, -1));
      }
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
      if (/[a-zA-Z]/.test(e.key) && e.key.length === 1 && word.length < max_letters) {
        setWord(prevWord => [...prevWord, e.key]);
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener('keydown', handleKeyInput);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyInput);
    };
  }, [word, locked, idx, current, won]);

  useEffect(() => {
    if (submited) {
      setWordHistory((prevHistory) => ({ ...prevHistory, [idx]: prevHistory[idx] || word }));
    }
  }, [submited, idx, word, setWordHistory]);

  const handleSubmit = (e) => {
    if (idx !== current) return;

    if (word.indexOf(" ") === -1 && word.join("") === actualword) {
      setLocked(true);
      setSubmitted(true);
      sendSub(idx + 1);
      setTimeout(() => {
        setWon(true);
      }, 12);
      word.forEach((char, index) => {
        if (actualword.indexOf(char) !== -1) {
          setkeyboardHistory((prevHistory) => ({ ...prevHistory, [char]: indexColor(char, word.indexOf(char), actualword) }));
        }
      });
    } else if (word.length === max_letters && word.indexOf(" ") === -1) {
      word.forEach((char, index) => {
        if (actualword.indexOf(char) !== -1) {
          setkeyboardHistory((prevHistory) => ({ ...prevHistory, [char]: indexColor(char, word.indexOf(char), actualword) }));
        }
      });
      setLocked(true);
      setSubmitted(true);
      sendSub(idx + 1);
    }
  };


  const renderCell = (char, index) => (
    <Cell key={index} classy={keyboardHistory[char]} char={char} />
  );

  if (idx !== current) {
    return (
      <div className="row">
        {wordHistory[idx]?.map(renderCell) || Array.from({ length: max_letters }, (_, index) => renderCell(" ", index))}
      </div>
    );
  }

  return (
    <div className="row">
      {Array.from({ length: max_letters }).map((_, index) => (
        <React.Fragment key={index}>
          <Cell classy={KeyboardEvent[word[index]]} char={word[index]} />
        </React.Fragment>
      ))}</div>
  );
};

export default Row;
