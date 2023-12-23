import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  //   MDBIcon,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import Cookies from 'js-cookie';

import api from '../../../services/api'

import { useNavigate } from 'react-router-dom';
import { faRobot } from '@fortawesome/free-solid-svg-icons';


function LoginSignup() {
  const navigate = useNavigate();
  
  const [justifyActive, setJustifyActive] = useState('tab1');


  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };


  useEffect(() => {
    const isAuthenticated = Cookies.get('access_token') != null;

    if (isAuthenticated) {
      // Use navigate within useEffect to avoid the warning
      navigate('/dashboard');
    }
  }, []);

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: ''
  });

  const [loginData, setLoginData] = useState({
    email: 'amol@gmail.com',
    password: 'Pass@123'
  });


  const handleSignup = async () => {
    try {
      if(signupData.firstName == '')
      {
        alert("First Name is Required.")
        return
      }else if(signupData.lastName == '')
      {
        alert("Last Name is Required.")
        return
      }else if(signupData.email == '')
      {
        alert("Email Id is Required.")
        return
      }if(signupData.phone == '' || signupData.phone.length != 10)
      {
        alert("Invalid Phone Number.")
        return
      }else if(signupData.password.length < 8)
      {
        alert("Password length must be greater than 8.")
        return
      }else if(signupData.password != signupData.repeatPassword)
      {
        alert("Password and repeate password must be equal.")
        return
      }
      const formData = new FormData()
      formData.append('first_name', signupData.firstName)
      formData.append('last_name', signupData.lastName)
      formData.append('phone', signupData.phone)
      formData.append('email', signupData.email)
      formData.append('password', signupData.password)
      let withoutHeader = true
      const response = await api.post('account/signup/', formData, withoutHeader);
      if (response.status == 200) {
        alert("Account created successfully..!")
        handleJustifyClick('tab1')
        setLoginData({
          "email": signupData.email,
          "password": ''
        })
      } else {
        alert("Error : Account Creation Failed.")
      }

      // Add logic for successful signup
    } catch (error) {
      console.error('Error during signup:', error);
      alert(error)
      // Add logic for handling signup error
    }
  };


  const handleLogin = async () => {
    try {
      const formData = new FormData()
      formData.append('email', loginData.email)
      formData.append('password', loginData.password)
      const response = await api.post('account/login/', formData);
      if (response.status == 200) {
        const responseData = await response.json();
        Cookies.set('access_token', responseData.access, { expires: 1 }); // , httpOnly: true expires in 7 days
        Cookies.set('refresh_token', responseData.refresh, {expires: 1});//httpOnly: true
        Cookies.set('first_name', responseData.first_name, {expires: 1});
        Cookies.set('last_name', responseData.last_name, {expires: 1});
        Cookies.set('email', responseData.email, {expires: 1});
        Cookies.set('phone', responseData.phone, {expires: 1});

        // Redirect to /dashboard
        navigate('/dashboard');
        // React.Component.NotificationManager.success('Successful Login!', 'Welcome to your dashboard.');

      } else {
        alert("Login Failed.")
      }

      // Add logic for successful login
    } catch (error) {
      console.error('Error during login:', error);
      // Add logic for handling login error
    }
  };


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-6 col-md-8 col-sm-12 mx-auto'>


          <MDBContainer className="p-3 my-5 mx-10 d-flex flex-column w-responsive">

            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                  Login
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                  Register
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
              <MDBTabsPane open={justifyActive === 'tab1'}>

                <div className="text-center mb-3">

                </div>

                <MDBInput wrapperClass='mb-4' placeholder='Email address' type='email' value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                <MDBInput wrapperClass='mb-4' placeholder='Password' type='password' value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />

                {/* <div className="d-flex justify-content-between mx-4 mb-4">
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                  <a href="!#">Forgot password?</a>
                </div> */}

                <Button className="mb-4 w-100 custom-button" onClick={handleLogin} >Sign in</Button>
                <p className="text-center">Not a member? <a href="#!" onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>Register</a></p>

              </MDBTabsPane>

              <MDBTabsPane open={justifyActive === 'tab2'}>

                <div className="text-center mb-3">
                  {/* <Alert variant="danger">Account is created successfully..!</Alert> */}
                </div>

                <MDBInput wrapperClass='mb-4' placeholder='First Name' type='text' value={signupData.firstName} onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })} />
                <MDBInput wrapperClass='mb-4' placeholder='Last Name' type='text' value={signupData.lastName} onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })} />
                <MDBInput wrapperClass='mb-4' placeholder='Email' type='email' value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
                <MDBInput wrapperClass='mb-4' placeholder='Phone Number' type='number' value={signupData.phone} onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })} />
                <MDBInput wrapperClass='mb-4' placeholder='Password' type='password' value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
                <MDBInput wrapperClass='mb-4' placeholder='Repeat Password' type='password' value={signupData.repeatPassword} onChange={(e) => setSignupData({ ...signupData, repeatPassword: e.target.value })} />

                {/* <div className='d-flex justify-content-center mb-4'>
                  <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
                </div> */}

                <Button className="mb-4 w-100" onClick={handleSignup}>Sign up</Button>

              </MDBTabsPane>

            </MDBTabsContent>

          </MDBContainer>


        </div>
      </div>
    </div>

  );
}

export default LoginSignup;