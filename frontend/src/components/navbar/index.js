import React from 'react';
import { useDispatch } from 'react-redux';
import { appLogout } from '../../store/slices/authSlice';
import "./style.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(appLogout());
  };

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <h1>Cloud Home</h1>
      </div>
      <div className='navbar-actions'>
        <button onClick={handleLogout} className='logout-button'>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
