import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import Spinner from "../../Services/Spinner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CredentialsModel } from "../../Models/AuthModel";


function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email required").required("Email is required"),
    password: yup.string().min(4).max(20).required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CredentialsModel>({ mode: "all", resolver: yupResolver(schema) });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate(location.state.previousUrl, { state: { previousUrl: location.pathname } });
    }

    dispatch(reset());
  }, [
    user,
    isError,
    isSuccess,
    message,
    navigate,
    dispatch,
    location.pathname,
    location.state.previousUrl,
  ]);

  if (isLoading) {
    return <Spinner />;
  }



  const loginUser = (model: CredentialsModel) => {
    const credentials = new CredentialsModel()
     credentials.email = model.email
     credentials.password = model.password
     dispatch(login(credentials))
  }

  

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit(loginUser)}>
          <div className="form-group">
            <input
              {...register("email")}
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
            <span className="">{errors.email?.message}</span>
          </div>
          <div className="form-group">
            <input
              {...register("password")}
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
            <span className="">{errors.password?.message}</span>
          </div>
          <div className="form-group">
            <button disabled={!isValid || !isDirty} type="submit" className="btn btn block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
