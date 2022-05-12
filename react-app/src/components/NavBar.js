
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
 const user = useSelector(state => state.session)

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
          {
            user.user === null ?
        <li>
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
        </li> :
           <li>
             <LogoutButton />
           <div>
             <NavLink to='/business-listing-form' exact={true}>
              Create your Business
             </NavLink>
           </div>
           </li>
          }
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
