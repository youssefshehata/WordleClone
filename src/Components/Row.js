import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import { act } from 'react-dom/test-utils';

const Row = ({ idx, max, actualword, won, setWon, current, sendSub, colorHistory, setColorHistory, wordHistory, setWordHistory }) => {
  const [submited, setSubmitted] = useState(false);
  const [word, setWord] = useState([]);
  const [locked, setLocked] = useState(false);
  const max_letters = max;

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

  const handleSubmit = (e) => {
    if (idx !== current) return;

    if (word.indexOf(" ") === -1 && word.join("") === actualword) {
      setLocked(true);
      setSubmitted(true);
      sendSub(idx + 1);
      setTimeout(() => {
        setWon(true);
      }, 12);
    } else if (word.length === max_letters && word.indexOf(" ") === -1) {
      word.forEach((char) => {
        if (actualword.indexOf(char) !== -1) {
          setColorHistory((prevHistory) => ({ ...prevHistory, [char]: prevHistory[char] || indexColor(char, actualword.indexOf(char), actualword) }));
          setLocked(true);
          setSubmitted(true);

          sendSub(idx + 1);
        }
      });
    }
  };

  useEffect(() => {
    if (submited) {
      setWordHistory((prevHistory) => ({ ...prevHistory, [idx]: prevHistory[idx] || word }));

    }
  })

  const indexColor = (char, index, actualword) => {
    if (idx !== current) return;

    if (actualword[index] === char) return 'green';

    if (actualword.indexOf(char) !== -1) return 'orange';

    return '';
  };

  if (idx !== current) {
    return (
      <div className="row">
        {Array.from({ length: max_letters }).map((_, index) => (
          <React.Fragment key={index}>

            {
              wordHistory[idx] ?
                (<Cell classy={colorHistory[wordHistory[idx][index]]} char={wordHistory[idx][index]} />) :
                (<Cell classy=" " char=" " />)

            }

          </React.Fragment>
        ))}
      </div>
    )
  }


  return (
    <div className="row">
      {Array.from({ length: max_letters }).map((_, index) => (
        <React.Fragment key={index}>
          <Cell classy={submited ? indexColor(word[index], index, actualword) : " "} char={word[index]} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Row;
