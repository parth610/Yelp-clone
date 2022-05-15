import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';

import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [zipCode, setZipCode] = useState()
  const [profilePhoto, setProfilePhoto] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, zipCode, profilePhoto));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='sign-up-form-container'>
    <form className='signup-form' onSubmit={onSignUp}>
      <div className='signup-form-header'>
        Share, rate, and connect with great local businesses.
      </div>
      <div className='errors-signupform'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

        <input
          className={errors?.includes('username : This field is required.') ? 'signup-inputs-red' : 'signup-inputs'}
          type='text'
          name='username'
          placeholder='Username'
          onChange={updateUsername}
          value={username}
        ></input>


        <input
          className='signup-inputs'
          type='text'
          name='email'
          placeholder='Email'
          onChange={updateEmail}
          value={email}
        ></input>


        <input
          className='signup-inputs'
          type='password'
          placeholder='Password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>


        <input
          className='signup-inputs'
          type='password'
          name='repeat_password'
          placeholder='Confirm Password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>


        <input
          className='signup-inputs'
          type='number'
          name='zip_code'
          placeholder='Zip Code'
          onChange={(e) => setZipCode(e.target.value)}
          value={zipCode}
        ></input>


        <input
          className='signup-inputs'
          type='text'
          name='profile_photo'
          placeholder='Profile Photo'
          onChange={(e) => setProfilePhoto(e.target.value)}
          value={profilePhoto}
        ></input>

      <button className='signup-form-button' type='submit'>Sign Up</button>
      <div>
        Already have an account?
      </div>
      <NavLink className='login-link-signup-form' to='/login' exact={true} activeClassName='active'>
            <div>
                Log in
            </div>
              </NavLink>
    </form>
    </div>
  );
};

export default SignUpForm;
