import { useState, createContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [words, setWords] = useState(null);
  const [wordsFetched, setWordsFetched] = useState(false);

  const addWord = (word) => {
    setWords([...words, word]);
  };

  const removeWord = (word) => {
    setWords([...words].filter((w) => w.id != word.id));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        words,
        setWords,
        addWord,
        removeWord,
        wordsFetched,
        setWordsFetched,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
