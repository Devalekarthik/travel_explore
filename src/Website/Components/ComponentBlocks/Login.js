import { useEffect, useState } from "react";
import { validateLoginForm } from "../Common/Validation";
import FormInput from "../Common/FormInput";
import Modal from "../Common/Modal";

const Login = (props) => {
  const { Data, loginData, setLoginData, setLogOut } = props;

  const [loginType, setLoginType] = useState("");
  const [loginError, setLoginError] = useState();
  const [loginValid, setLoginValid] = useState(false);

  const loginForm = () => {
    return (
      <form>
        {loginType === "register" && (
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label login-label">
              {Data.LabelData.name} :
            </label>
            <FormInput
              type="text"
              name="name"
              value={loginData.name}
              onChange={(e) => handleLoginData(e)}
              error={loginError?.name}
              errorClassName="login-error"
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="recipient-name" className="col-form-label login-label">
            {Data.LabelData.emailID} :
          </label>
          <FormInput
            type="text"
            name="email"
            value={loginData.email}
            onChange={(e) => handleLoginData(e)}
            error={loginError?.email}
            errorClassName="login-error"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message-text" className="col-form-label login-label">
            {Data.LabelData.password} :
          </label>
          <FormInput
            type="password"
            name="password"
            value={loginData.password}
            onChange={(e) => handleLoginData(e)}
            error={loginError?.password}
            errorClassName="login-error"
          />
        </div>
      </form>
    );
  };

  const handleLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const loginValidation = () => {
    const error = validateLoginForm(loginData, loginType, Data.ErrorLabel);

    if (error === null) {
      setLoginError(null);
      setLoginValid(true);
      return;
    }
    setLoginError(error);
  };

  const handleSignIn = () => {
    if (loginError === null) {
      setLoginValid(false);
      setLogOut(true);
      return;
    }

    loginValidation();
  };

  useEffect(() => {
    setLoginData({
      name: "",
      email: "",
      password: "",
    });
    setLoginError("");
  }, [loginType, setLoginData]);

  useEffect(() => {
    setLoginError("");
  }, [loginData]);

  return (
    <div className="login">
      <Modal
        id="login"
        title={Data.LabelData.signIn}
        showCloseButton={true}
      >
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" onClick={() => setLoginType("admin")}>
            <a
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              href="#admin"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              {Data.LabelData.admin}
            </a>
          </li>
          <li className="nav-item" onClick={() => setLoginType("register")}>
            <a
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              href="#register"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              {Data.LabelData.register}
            </a>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="admin"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            {loginForm()}
          </div>
          <div
            className="tab-pane fade"
            id="register"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            {loginForm()}
          </div>
        </div>
        <button
          className={`login-signinBtn
            ${
              loginError === null && loginValid
                ? "btn btn-success"
                : "btn btn-primary"
            }
          `}
          onClick={handleSignIn}
          data-bs-dismiss={loginError === null && loginValid ? "modal" : ""}
          aria-label="Close"
        >
          {loginError === null && loginValid
            ? Data.LabelData.signIn
            : Data.LabelData.verify}
        </button>
      </Modal>
    </div>
  );
};
export default Login;
