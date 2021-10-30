import React, { useState, useEffect } from 'react';
import  { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth0 } from '@auth0/auth0-react';



function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Predictant
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link
                  // Home page will always be shown, whether user is logged in or not
                  to='/'
                  className='nav-links'
                  onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/about'
                className='nav-links'
                onClick={closeMobileMenu}
                >
                About
              </Link>
            </li>
            { !isLoading && user && (
                // This check is if user is logged in, then the Models tab will show, otherwise it will not
                <li className='nav-item'>
              <Link
                to='/models'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Models
              </Link>
            </li>
            )}
          </ul>
          { !isLoading && !user && (
              // If the user is not logged in and page is not loading, then LoginButton script will be ran
              button && <LoginButton buttonStyle='btn--outline'>LOGIN | SIGN UP</LoginButton>
          )}
          { !isLoading && user && (
              // If the user is logged in and page is not loading, then LogoutButton script will be ran
              button && <LogoutButton buttonStyle='btn--outline'>LOGOUT</LogoutButton>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;