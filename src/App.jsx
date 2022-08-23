import reactLogo from './assets/react.svg';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { MemoryGame } from './pages/MemoryGame';
import { Login } from './pages/Login';
import { NavBar } from './components/NavBar';
import { Protected } from './components/Protected';
import { useState } from 'react';

function App() {
  return (
    <>
      <NavBar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          ></Route>

          <Route
            path="/practice"
            element={
              <Protected>
                <MemoryGame />
              </Protected>
            }
          ></Route>

          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
