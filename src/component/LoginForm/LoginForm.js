import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./LoginForm.module.css";
import useInput from "../../hooks/use-input";
import { isEmailValid, isPasswordValid } from "../../utils/validation";
import LoadingSpinner from "../UI/Spinner/LoadingSpinner";
import { loginThunk, resetError } from "../../store/modules/auth";
import useModal from "../../hooks/use-modal";
const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, error, isLogin } = useSelector((state) => state.auth);
  const { openModal } = useModal();
  const changeJoinFormHandler = () => {
    history.push("/join");
  };

  useEffect(() => {
    if (error) {
      openModal(error);
    }
    return () => {
      dispatch(resetError());
    };
  }, [error, dispatch, openModal]);

  useEffect(() => {
    if (isLogin) {
      history.replace("/");
    }
  }, [isLogin, history]);

  const {
    value: enteredEmail,
    hasError: emailHasError,
    valusIsValid: enteredEmailIsValid,
    changeValueHandler: emailChangeHandler,
    focusHandler: emailFocusHandler,
  } = useInput(isEmailValid);
  const {
    value: enteredPassword,
    hasError: passwordHasError,
    valusIsValid: enteredPasswordIsValid,
    changeValueHandler: passwordChangeHandler,
    focusHandler: passwordFocusHandler,
  } = useInput(isPasswordValid);

  const submitLoginForm = async (e) => {
    e.preventDefault();
    dispatch(
      loginThunk({
        email: enteredEmail,
        password: enteredPassword,
      })
    );
  };

  if (isLoading) return <LoadingSpinner />;

  const emailInputStyle = `${classes["login__input"]} ${
    emailHasError && classes.inValid
  }`;
  const passwordInputStyle = `${classes["login__input"]} ${
    passwordHasError && classes.inValid
  }`;
  return (
    <div className={classes["login"]}>
      <form className={classes["login-form"]} onSubmit={submitLoginForm}>
        <Input
          label="이메일"
          input={{
            type: "email",
            name: "email",
            placeholder: "email",
          }}
          onChange={emailChangeHandler}
          onBlur={emailFocusHandler}
          inputClassName={emailInputStyle}
          labelClassName={classes["login__label"]}
        />

        <Input
          label="패스워드"
          input={{
            type: "password",
            name: "password",
            placeholder: "password",
            autoComplete: "on",
          }}
          onChange={passwordChangeHandler}
          onBlur={passwordFocusHandler}
          inputClassName={passwordInputStyle}
          labelClassName={classes["login__label"]}
        />
        <Button
          type="button"
          className={classes["join__btn"]}
          onClick={changeJoinFormHandler}
        >
          회원가입
        </Button>
        <Button
          disabled={!enteredEmailIsValid || !enteredPasswordIsValid}
          className={classes["login__btn"]}
        >
          로그인
        </Button>
      </form>
    </div>
  );
};
export default LoginForm;
