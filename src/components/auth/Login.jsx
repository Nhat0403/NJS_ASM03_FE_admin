import { useState } from "react";
import './auth.css'
import { useDispatch } from "react-redux";
import { setTouched } from "../hook/lib";
import { useNavigate } from "react-router-dom";
import Input from "../UI/Input";
import ErrorModal from "../UI/ErrorModal";
import { onBlurHandler, onChangeHanlder, validEmail, validLength, validRequire } from "../../util/validators";
import PageContainer from "../pageContainer/PageContainer";
import queryString from "query-string";
import UserAPI from "../../API/UserAPI";
import setCookie from "../../setCookie";
import { addSession } from '../Redux/Action/ActionSession';
import getCookie from "../../getCookie";

const Login = (pros) => {
  const [email, setEmail] = useState({
    value: '',
    valid: false,
    touched: false,
    validators: [validLength({ min: 4 }), validEmail, validRequire]
  });
  const [password, setPassword] = useState({
    value: '',
    valid: false,
    touched: false,
    validators: [validLength({ min: 4 }), validRequire]
  });

  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    setTouched(setEmail);
    setTouched(setPassword);

    console.log(email.value);

    if(email.valid) {
      const params = {
        email: email.value,
        password: password.value
      }
      const query = '?' + queryString.stringify(params);
      UserAPI.postLogin(query)
        .then(response => {
          if(response) {
            console.log(response);
            localStorage.setItem('id_user', response._id);
            localStorage.setItem('name_user', response.fullname);
            const action = addSession(response);
            // const action = addSession(localStorage.getItem('id_user'));
            dispatch(action);
            setCookie('user_token', response.token, +1);
            console.log('token: ' + getCookie('user_token'));
            navigate('/chat');
          }
        })
        .catch(err => {
          console.log(err);
          // setError({
          //   title: 'Validation failed!',
          //   message: err.response.data.message
          // })
        });
    };

    if(!email.valid || !password.valid) {
      // console.log('no');
      return setError({
        title: 'Validation failed!',
        message: 'Invalid email or password!'
      })
    }
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={() => setError(null)}
          error={!!error}
        />
      )}
      <PageContainer>
        <main className="centered">
          <h1>Login</h1>
          <form className="form-group">
            <Input
              control="input"
              id="email"
              type="text" 
              placeholder="email" 
              required={true}
              onChange={e => onChangeHanlder(e, setEmail, email.validators)}
              onBlur={e => onBlurHandler(e, setEmail, email.validators)}
              value={email.value}
              isValid={email.valid}
              isTouched={email.touched}
            />
            <Input 
              control="input"
              id="password"
              type="password" 
              placeholder="password"
              onChange={e => onChangeHanlder(e, setPassword, password.validators)}
              onBlur={e => onBlurHandler(e, setPassword, password.validators)}
              required={true}
              value={password.value}
              isValid={password.valid}
              isTouched={password.touched}
            />
            <button 
              type="submit" 
              className="btn"
              onClick={loginHandler}
            >Login</button>
          </form>
        </main>
      </PageContainer>
    </>
  );
};

export default Login;