import { signInWithPopup, auth, provider } from '../firebase';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/authStatus';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

export function Login() {
  const navigate = useNavigate();
  //const currentUser = useSelector((state) => state.user.currentUser);
  const { checkingStatus } = useAuthStatus();
  const { currentUser, setCurrentUser } = useContext(AppContext);

  const handleSubmit = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = {
        displayName: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
      };

      setCurrentUser(user);
      navigate('/dashboard');
    } catch (e) {
      console.log(e);
      alert('Unable to authenticate user', e);
    }
  };

  if (checkingStatus) {
    return (
      <>
        <img src="/loader.svg" alt="loader" /> Loading...
      </>
    );
  }

  if (!checkingStatus && currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-section">
      <h1>Login</h1>
      <button className="login-with-google-btn" onClick={handleSubmit}>
        Login with Google
      </button>
    </div>
  );
}
