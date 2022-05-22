import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashComponent from './components/SplashPage/SplashPageComponent';
import BusinessFormComponent from './components/BusinessFormComponent/BusinessFormComponent';
import BusinessListingComponent from './components/BusinessLists/BusinessesListingsComponent';
import './index.css'
import BusinessSoloComponenent from './components/BusinessLists/BusinessSoloView';
import FooterComponent from './components/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        <ProtectedRoute path='/business/:busId'>
          <BusinessSoloComponenent />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/business-listing-form'>
          <BusinessFormComponent />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashComponent />
        </Route>
        <ProtectedRoute path='/businesses-lists'>
          <BusinessListingComponent />
        </ProtectedRoute>
      </Switch>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
