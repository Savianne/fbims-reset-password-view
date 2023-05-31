import React from 'react';
import styled from 'styled-components';
import BarLoader from "react-spinners/BarLoader";
import SyncLoader from "react-spinners/SyncLoader";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Reset } from 'styled-reset';
import Layout, { Container, LoginForm, BGImage } from "./Layout";
import UseRipple from './UseRipple';
import AppLogo from './AppLogo';
import Button from './Button';
import FaveVerse from './FaveVerse';
import IconInput from './IconInput';
import Bubble from './Bubble';
import Avatar from './Avatar';
import OtpInput from './OTPField';
import MessageBox from './MessageBox';
import ExpirationTimer from './ExpirationTimer';
import SnackBars from './SnackBar/SnackBars';

import useAddSnackBar from './SnackBar/useSnackBar';

function App() {
  const [user, setUser] = React.useState<{fullName: string, email: string, avatar: string} | null>(null);
  const [passwordError, setPasswordError] = React.useState<null | "init" | string>("init");
  const [passwordInputVal, updatePasswordInputVal] = React.useState<null | string>(null);
  const [confirmPasswordInputVal, updateConfirmPasswordInputVal] = React.useState<null | string>(null);
  const [passwordMatch, setPasswordMatch] = React.useState(false);
  const [formExpired, setFormExpired] = React.useState(false);
  const [formExpDate, setFormExpDate] = React.useState<null | Date>(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const [redirecting, setRedirecting] = React.useState(false);

  const addSnackBar = useAddSnackBar();

  React.useEffect(() => {
    passwordInputVal !== null &&
    setPasswordError((function validatePassword(password: string): null | string {
      const regex = /^(?=.*[A-Z])(?=.*\d).*$/;
    
      if (password.length < 8) {
        return "Password Must be 8 characters long";
      }
    
      if (!regex.test(password)) {
        return "Password Must must have atleast 1 numeric and atleas 1 uppercase letter";
      }
    
      return null;
    })(passwordInputVal))
  }, [passwordInputVal]);

  React.useEffect(() => {
    if(passwordInputVal !== null && confirmPasswordInputVal !== null) (passwordInputVal == confirmPasswordInputVal)? setPasswordMatch(true) : setPasswordMatch(false);
  }, [confirmPasswordInputVal, passwordInputVal]);

  React.useEffect(() => {
    if(passwordError !== "init" && passwordError !== null) updateConfirmPasswordInputVal(null);
  }, [passwordError]);

  React.useEffect(() => {
    setIsLoading(true);
    axios.get('/get-reset-pass-account')
    .then(function (response) {
      const {user, expDate} = response.data as {user: {name: string, avatar: string, email:string, UID: string, congregation: string}, expDate: Date};
      setUser({fullName: user.name, email: user.email, avatar: user.avatar});
      setFormExpDate(new Date(expDate));
      setIsLoading(false);
    })
    .catch(function (error) {
      setIsLoading(false);
      addSnackBar("Fetching User-info Error! Try Reloading Page", "error", 5);
      console.log(error);
    });
  }, []);

  return (
    <React.Fragment>
      <Reset />
      <div className="App">
        <Layout>
          {
            redirecting && <div className="global-loading-spinner">
              <div className="loading-content">
                <SyncLoader color="#00BCD4" /> <h1 className="spinner-text">Redirecting...</h1>
              </div>
            </div>
          }
          <SnackBars position='bottom-center' />
          <BGImage />
          {
            user? 
            <>
            {
              formExpDate && <>
              <Container>
                {
                  !formExpired? <>
                  <div className="timer">
                    <ExpirationTimer expirationDate={formExpDate.getTime()} onExpires={() => setFormExpired(true)} text='This Form Expires within'/>
                  </div>
                  <div className="loading-indicator-area">
                    <BarLoader color="rgb(21, 169, 253)" cssOverride={{height: "5px", width: "100%"}} loading={isLoading} />
                  </div>
                  <LoginForm>
                    <Bubble color='rgb(20 242 78 / 88%)' size="130px" left="-45px" bottom="220px" />
                    <Bubble color='rgb(255 193 7 / 62%)' size="40px" left="205px" bottom="250px" />
                    <Bubble color='rgb(156 39 176 / 47%)' size="70px" right="35px" top="50px" />
                    <Bubble color='rgb(0 150 136 / 43%)' size="210px" right="-55px" bottom="-20px" />
                    <AppLogo>
                        <img src='/fbims-logo.png' />
                    </AppLogo>
                    <div className="user-info-group">
                      {
                        user && <>
                          <Avatar src={user.avatar} alt={user.fullName} size="50px" />
                          <p className="user-fullname">{user.fullName}</p>
                          {/* <p className="user-email">{user.email}</p> */}
                        </>
                      }
                    </div>
                    <h1>Reset Password</h1>
                    <div className="form-group">
                      <MessageBox color="orange">
                        <p>A valid Password must be atleast 8 characters long, must have atleast 1 numeric, and atleas 1 uppercase letter</p>
                      </MessageBox>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <IconInput 
                        disabled={isLoading}
                        error={!!(passwordError && passwordError !== "init")} 
                        placeholder='Password' 
                        type="password" 
                        icon={<FontAwesomeIcon icon={["fas", "lock"]} />} 
                        flexible 
                        value={passwordInputVal !== null? passwordInputVal : ''} 
                        onChange={(val) => updatePasswordInputVal(val)}/>
                        { passwordError && passwordError !== "init" && <p className="error-text">{passwordError}</p> }
                      </div>
                      <div className="input-group">
                        <IconInput 
                        disabled={isLoading || !!passwordError}
                        error={!!(confirmPasswordInputVal !== null && !passwordMatch)} 
                        placeholder='Confirm Password' 
                        type="password" 
                        icon={<FontAwesomeIcon icon={["fas", "lock"]} />} 
                        flexible 
                        value={confirmPasswordInputVal !== null? confirmPasswordInputVal : ''} 
                        onChange={(val) => updateConfirmPasswordInputVal(val)}/>
                        { confirmPasswordInputVal !== null && !passwordMatch && <p className="error-text">Password not match</p> }
                      </div>
                      <Button 
                      color='white' 
                      bgColor='#15A9FD' 
                      disabled={isLoading || !passwordMatch}
                      onClick={(e) => {
                        setIsLoading(true);
                        axios.post('/verify-reset-password', {email: user.email, password: passwordInputVal})
                        .then(res => {
                          if(res.data.changePassSuccess) {
                            addSnackBar("Reset Password Successfully", "success", 5);
                            setIsLoading(false);
                            setRedirecting(true);
                            setTimeout(() => {
                              window.location.assign('/');
                            }, 500);
                          } else throw res.data.error;
                        })
                        .catch(err => {
                          addSnackBar("Reset Password Faild!", "error", 5);
                          setIsLoading(false);
                        })
                      }}>
                        <UseRipple />
                        Reset Password
                      </Button>
                    </div>
                  </LoginForm>
                  </> : <div className="got-expired">Form Got Expired!</div>
                }
              </Container>
              </>
            }
            </>
            :
            <div className="global-loading-spinner">
              <div className="loading-content">
                <SyncLoader color="#00BCD4" /> <h1 className="spinner-text">Loading User...</h1>
              </div>
            </div>
          }
        </Layout>
      </div>
    </React.Fragment>
  );
}

export default App;
