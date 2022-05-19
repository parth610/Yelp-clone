
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import shareit_logo from '../images/srateit_logo.png'
import { login } from '../store/session';

const NavBar = () => {
 const user = useSelector(state => state.session)
 const dispatch = useDispatch()

 const loginDemo = async (e) => {
  e.preventDefault();
  await dispatch(login('demo@aa.io', 'password'));

};

  return (
    <nav>
        <div className='home-link-container'>
          <NavLink to='/' className='shareit-logo-link' exact={true} activeClassName='active'>
            <img className='shareit-logo' src={shareit_logo} />
          </NavLink>
        </div>
          {
            user.user === null ?
        <div className='auth-buttons'>
              <NavLink className='login-link' to='/login' exact={true} activeClassName='active'>
            <div>
                Log in
            </div>
              </NavLink>
              <NavLink className='sign-up-link' to='/sign-up' exact={true} activeClassName='active'>
            <div>
                Sign Up
            </div>
              </NavLink>
              <button className='demo-user-button' onClick={loginDemo}>
                Demo User
              </button>
        </div> :
        <div className='auth-buttons-container-loggedin'>
             <NavLink className='create-business-button' to='/business-listing-form' exact={true}>
           <div>
              Create your Business
           </div>
             </NavLink>
           <div className='logout-button-cont'>
             <LogoutButton />
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
