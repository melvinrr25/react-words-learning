import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useAuthStatus } from '../hooks/authStatus';
import AppContext from '../context/AppContext';

export function Protected({ children }) {
  const { currentUser } = useContext(AppContext);
  const { checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return (
      <div className="loader">
        <img src="/loader.svg" alt="loader" /> Loading...
      </div>
    );
  }

  if (!checkingStatus && !currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}
