import { useState, useContext } from 'react';
import AppContext from '../context/AppContext';

export function MemoryGame() {
  const { words } = useContext(AppContext);
  const [gameStarted, setGameStarted] = useState(false);
  const [meaningVisible, setMeaningVisible] = useState(false);
  const [gameWords, setGameWords] = useState([]);
  const [gameOkWords, setGameOkWords] = useState([]);
  const [gameFailedWords, setGameFailedWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);

  const suffleList = (list) => {
    return list
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const isLastWord = () => wordIndex == gameWords.length - 1;

  const handleNextWord = () => {
    if (isLastWord()) {
      let continuePractice;

      if (gameFailedWords.length) {
        continuePractice = confirm(`
        The practice is over!

        Known words: ${gameOkWords.length}
        Unknown words: ${gameFailedWords.length}

        Would you like to practice the unkown words?
      `);
      } else {
        continuePractice = false;
      }

      setWordIndex(0);
      setGameOkWords([]);
      setGameFailedWords([]);
      setMeaningVisible(false);

      if (continuePractice) {
        setMeaningVisible(false);
        handleGameState('start', [...gameFailedWords]);
      } else {
        alert('The practice is over!');
        handleGameState('stop', words);
      }
      return;
    }

    setMeaningVisible(false);
    setWordIndex(wordIndex + 1);
  };
  const handleResponse = (response) => {
    if (response == 'yes') {
      const okWords = [...gameOkWords, gameWords[wordIndex]];
      setGameOkWords(okWords);
      setMeaningVisible(true);
    } else {
      const failedWords = [...gameFailedWords, gameWords[wordIndex]];
      setGameFailedWords(failedWords);
      setMeaningVisible(true);
    }
  };
  const handleGameState = (state, wordsList) => {
    if (state == 'start') {
      setGameStarted(true);
      const list = suffleList(wordsList);
      setGameWords(list);
    } else {
      setGameStarted(false);
    }
  };

  if (gameStarted) {
    return (
      <div className="center">
        <div className="game-board">
          <div className="total-words">Total Words: {gameWords.length}</div>
          <div className="summary-words">
            <div className="ok-words">{gameOkWords.length}</div>
            <div className="failed-words">{gameFailedWords.length}</div>
          </div>
          <div className="current-word">
            <div className="word-to-guess">
              <div className="word">{gameWords[wordIndex].word}</div>
              {meaningVisible && (
                <div className="meaning">{gameWords[wordIndex].meaning}</div>
              )}
            </div>
            <div className="word-answer">
              {meaningVisible && (
                <button onClick={handleNextWord} className="next-word">
                  Next
                </button>
              )}

              {!meaningVisible && (
                <>
                  <button
                    onClick={() => handleResponse('yes')}
                    className="i-know"
                  >
                    I know it
                  </button>
                  <button
                    onClick={() => handleResponse('no')}
                    className="i-dont-know"
                  >
                    I dont know it
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="center">
        <button
          onClick={() => handleGameState('start', words)}
          className="button orange"
        >
          Start Practice
        </button>
      </div>
    );
  }
}
