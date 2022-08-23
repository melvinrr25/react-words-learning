import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from '../firebase';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

export const useAuthStatus = () => {
  const [checkingStatus, setCheckingStatus] = useState(true);
  const { setCurrentUser } = useContext(AppContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCheckingStatus(false);

      if (user) {
        const userData = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        };

        setCurrentUser(userData);
      } else if (!user && !checkingStatus) {
        setCurrentUser(null);
      }
    });
  }, []);

  return { checkingStatus };
};
