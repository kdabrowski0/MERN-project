import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignUpMutation } from "./usersApiSlice";
import "./SignUp.css";

const USER_REGEX = /^[A-z0-9]{3,20}$/;
const PWD_REGEX = /^[A-z0-9]{4,12}$/;

const SignUp = () => {
  const [signUp, { isLoading, isSuccess, isError, error }] =
    useSignUpMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
    }
  }, [isSuccess]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onUsernameBlur = () => setUsernameTouched(true);
  const onPasswordBlur = () => setPasswordTouched(true);

  const canSave = [validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await signUp({ username, password });
      navigate("/login");
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass =
    usernameTouched && !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    passwordTouched && !validPassword ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveUserClicked}>
        <div>
          <h2>New User</h2>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${
            username ? (validUsername ? "" : "form__input--incomplete") : ""
          }`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl]</span>
        </label>
        <input
          className={`form__input ${
            password ? (validPassword ? "" : "form__input--incomplete") : ""
          }`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />
        <button
          className="form__submit-button"
          title="Save"
          disabled={!canSave}
        >
          Sign Up
        </button>
      </form>
      <Link to="/" className="form__submit-button">
        Back to Home
      </Link>
    </>
  );

  return content;
};
export default SignUp;
