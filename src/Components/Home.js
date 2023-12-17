import Grid from './Grid'
import React, { createContext, useContext, useState } from 'react';
import { WordProvider } from './context';
import { WordContext } from './context';


const Home = () => {
  const { rightWord, updateRightWord } = useContext(WordContext);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const PopupModal = ({ onClose, onPlayAgain }) => {
    return (
      <div className="popup">
        <div className="popup-content">
          <p>You Won!</p>
          <button onClick={onPlayAgain}>Play Again</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };



  const handleWin = () => {
    setPopupOpen(true);
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  const handlePlayAgain = () => {
    window.location.reload();
    setPopupOpen(false);
  };


  const onWinning = () => {
    updateRightWord();
    handleWin();

  }

  return (
    <>
      <div className="home">
        <Grid actualword={rightWord} setWon={onWinning} />
        {isPopupOpen && (
          <PopupModal onClose={handleClose} onPlayAgain={handlePlayAgain} />
        )}

      </div>
    </>

  );
};

export default Home;
