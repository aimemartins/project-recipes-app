import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  MDBContainer,
  MDBInput,
  // MDBCheckbox,
  MDBBtn,
  // MDBIcon
}
  from 'mdb-react-ui-kit';
import bg from '../images/app-logo-white .png';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const accPassword = 6;
    const passwordValidation = password.length > accPassword;
    const emailValidation = email.toLowerCase().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    const enable = emailValidation && passwordValidation;
    if (enable) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const history = useHistory();

  const btnClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div className="login-container">
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <div className="text-center">
          <img
            src={ bg }
            style={ { width: '100%', height: '100px', marginBottom: '2rem' } }
            alt="logo"
          />
        </div>
        <div className="email-login">
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            value={ email }
            data-testid="email-input"
            id="form1"
            type="email"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>
        <div className="password-login">
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            value={ password }
            data-testid="password-input"
            type="password"
            id="form2"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>
        <MDBBtn
          data-testid="login-submit-btn"
          className="mb-4 px-5"
          color="dark"
          size="lg"
          type="submit"
          disabled={ disabled }
          onClick={ btnClick }
        >
          Enter
        </MDBBtn>
      </MDBContainer>
    </div>
  );
}

export default Login;
