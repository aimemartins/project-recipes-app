import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    <form>
      <input
        value={ email }
        data-testid="email-input"
        id="email"
        type="email"
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        value={ password }
        data-testid="password-input"
        type="password"
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button
        data-testid="login-submit-btn"
        type="submit"
        disabled={ disabled }
        onClick={ btnClick }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
