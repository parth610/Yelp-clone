
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
 const user = useSelector(state => state.session)

  return (
    <nav>
        <div className='home-link-container'>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
          {
            user.user === null ?
        <div className='auth-buttons'>
            <div>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </div>
            <div>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </div>
        </div> :
           <div className='logout-button-cont'>
             <LogoutButton />
           <div>
             <NavLink to='/business-listing-form' exact={true}>
              Create your Business
             </NavLink>
           </div>
           </div>
          }
        {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
    </nav>
  );
}

export default NavBar;
