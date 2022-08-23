import { useEffect, useState, useContext } from 'react';
import {
  db,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from '../firebase';
import AppContext from '../context/AppContext';

export function Dashboard() {
  const {
    currentUser,
    setWords,
    addWord,
    words,
    removeWord,
    wordsFetched,
    setWordsFetched,
  } = useContext(AppContext);

  const [formVisible, setFormVisible] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newMeaning, setNewMeaning] = useState('');

  useEffect(() => {
    if (currentUser && !wordsFetched) {
      const q = query(
        collection(db, 'words'),
        where('user_id', '==', currentUser.uid)
      );

      getDocs(q)
        .then((snapshot) => {
          let wordDocs = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          setWords(wordDocs);
          setWordsFetched(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const handleCreateWord = (e) => {
    e.preventDefault();
    const colRef = collection(db, 'words');
    const wordData = {
      word: newWord,
      meaning: newMeaning,
      user_id: currentUser.uid,
    };

    addDoc(colRef, wordData).then((res) => {
      wordData.id = res.id;
      addWord(wordData);
      setNewWord('');
      setNewMeaning('');
    });
  };

  const handleRemoveWord = (word) => {
    return () => {
      if (!confirm('Are you sure?')) {
        return;
      }
      const docRef = doc(db, 'words', word.id);
      try {
        deleteDoc(docRef);
        removeWord(word);
      } catch (e) {}
    };
  };

  return (
    <>
      <div className="flex-justify-between margin-bottom">
        <h1 className="">Your words</h1>
        <button onClick={() => setFormVisible(true)} className="button orange">
          Add New Word
        </button>
      </div>
      {formVisible && (
        <div className="form-new-word section margin-bottom">
          <form onSubmit={handleCreateWord}>
            <div className="input-control">
              <label htmlFor="newWord">Word:</label>
              <input
                required
                onChange={(e) => setNewWord(e.target.value)}
                id="newWord"
                type="text"
                value={newWord}
              />
            </div>
            <div className="input-control">
              <label htmlFor="newMeaning">Meaning:</label>
              <input
                required
                onChange={(e) => setNewMeaning(e.target.value)}
                id="newMeaning"
                type="text"
                value={newMeaning}
              />
            </div>
            <div className="buttons-control">
              <button className="button purple">Save</button>
              <button onClick={() => setFormVisible(false)} className="button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="words-wapper">
        {words &&
          words.map((word) => {
            return (
              <div key={word.id} className="word-card-parent">
                <div key={word.id} className="word-card">
                  <header>{word.word}</header>
                  <footer>{word.meaning}</footer>
                </div>
                <button
                  className="remove-word"
                  onClick={handleRemoveWord(word)}
                >
                  <img src="/remove.svg" alt="loader" />
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
