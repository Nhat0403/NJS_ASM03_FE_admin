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

const SignUp = (pros) => {
  const [fullname, setFullname] = useState({
    value: '',
    valid: false,
    touched: false,
    validators: [validLength({ min: 4 }), validRequire]
  });
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
  const [phone, setPhone] = useState({
    value: '',
    valid: false,
    touched: false,
    validators: [validLength({ min: 4 }), validRequire]
  });
  const [error, setError] = useState();

  // const { users } = useAPI();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const signUpHandler = (e) => {
    e.preventDefault();

    setTouched(setFullname);
    setTouched(setEmail);
    setTouched(setPassword);
    setTouched(setPhone);

    if(!email.valid || !password.valid) {
      return setError({
        title: 'Validation failed!',
        message: 'Invalid email or password!'
      })
    }

    if(email.valid && password.valid && fullname.valid && phone.valid) {
        const params = {
          email: email.value,
          password: password.value,
          fullname: fullname.value,
          phone: phone.value
        };
        const query = '?' + queryString.stringify(params);
        UserAPI.postSignUp(query)
          .then(response => {
            console.log(response);
            if(response) {
              console.log(response);
              navigate('/auth/login');
            }
          })
          .catch(err => {
            if(err.response.status) {
              setError({
                title: 'Validation failed!',
                message: err.response.data.message
              })
            }
          });
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
          <h1>SignUp</h1>
          <form className="form-group">
            <Input
              control="input"
              id="fullname"
              type="text" 
              placeholder="fullname" 
              required={true}
              onChange={e => onChangeHanlder(e, setFullname, fullname.validators)}
              onBlur={e => onBlurHandler(e, setFullname, fullname.validators)}
              value={fullname.value}
              isValid={fullname.valid}
              isTouched={fullname.touched}
            />
            <Input
              control="input"
              id="email"
              type="email" 
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
            <Input 
              control="input"
              id="phone"
              type="tel" 
              placeholder="phone"
              onChange={e => onChangeHanlder(e, setPhone, phone.validators)}
              onBlur={e => onBlurHandler(e, setPhone, phone.validators)}
              required={true}
              value={phone.value}
              isValid={phone.valid}
              isTouched={phone.touched}
            />
            <button 
              type="submit" 
              className="btn"
              onClick={signUpHandler}
            >SignUp</button>
          </form>
        </main>
      </PageContainer>
    </>
  );
};

export default SignUp;