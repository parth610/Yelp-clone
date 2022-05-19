import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-container'>
    <form className='login-form' onSubmit={onLogin}>
      <div className='login-form-header'>Log in to add reviews or list your business</div>
      <div className='login-errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

        <input
        className={errors?.includes('email : This field is required.') || errors?.includes('email : No such user exists.') || errors?.includes('email : Email provided not found.') ? 'login-inputs-red' :'login-inputs'}
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />


        <input
        className={errors?.includes('password : Password was incorrect.') || errors?.includes('password : This field is required.') ? 'login-inputs-red' : 'login-inputs'}
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button className='login-form-button' type='submit'>Login</button>
        <div>
        Don't have an account?
      </div>
      <NavLink className='login-link-signup-form' to='/sign-up' exact={true} activeClassName='active'>
          <div>
                Sign Up
          </div>
            </NavLink>
    </form>
    </div>
  );
};

export default LoginForm;
