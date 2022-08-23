import { Link } from 'react-router-dom';
import { signOut, auth } from '../firebase';
import { useAuthStatus } from '../hooks/authStatus';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

export function NavBar() {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const { checkingStatus } = useAuthStatus();

  const logOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (e) {
      console.log(e);
      alert('Unable to log user out', e);
    }
  };

  return (
    <nav className="top-menu">
      <ul className="top-menu__items-list">
        <li className="logo">
          <Link to="/">Logo App</Link>
        </li>
        <li className="nav-items">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            {!checkingStatus && currentUser && (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/practice">Practice</Link>
                </li>
                <li className="login-link">
                  <Link to="#" onClick={logOut}>
                    Logout
                  </Link>
                </li>
              </>
            )}

            {!checkingStatus && !currentUser && (
              <li className="login-link">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </li>
      </ul>
    </nav>
  );
}
