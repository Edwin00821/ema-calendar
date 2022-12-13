import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import "./LoginPage.css";
import calendarApi from "../../api/calendarApi";

const loginFormFields = {
  loginEmail: "",
};

(async () => {
  const params = window.location.search.substring(1),
    emailRegex = /\S+@\S+\.\S+/;

  if (emailRegex.test(params)) {
    await calendarApi.get(`/auth/${params}`).then((res) => {
      console.log({ res });
      localStorage.clear();
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
    });
  }
})();

export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore();

  const { loginEmail, onInputChange: onLoginInputChange } =
    useForm(loginFormFields);
  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail }).then();
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
