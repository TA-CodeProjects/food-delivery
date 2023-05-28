import { useEffect } from "react";
import { RegisterModel } from "../../Models/AuthModel";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registered, reset } from "../../features/auth/authSlice";
import Spinner from "../../Services/Spinner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

function Register() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user, isLoading, isError, isSuccess, message } = useAppSelector(
      (state: any) => state.auth
    );

    const schema = yup.object().shape({
      name: yup.string().max(20).required("Name is required"),
      email: yup.string().email("Invalid email required").required("Email is required"),
      password: yup.string().min(4).max(20).required("Password is required"),
      password2: yup.string().test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value
      }),
    });

    const {
      register,
      handleSubmit,
      formState: { errors, isDirty, isValid },
    } = useForm<RegisterModel>({ mode: "all", resolver: yupResolver(schema) });


    const registerUser = (model: RegisterModel) => {
      dispatch(registered(model));
    };


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/login", { state: { previousUrl: "/" } });
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])



    if (isLoading) {
        return <Spinner />
    }

    return (
      <>
        <section className="heading">
          <h1>
            <FaUser /> Register
          </h1>
          <p>Please create an account</p>
        </section>

        <section className="form">
          <form onSubmit={handleSubmit(registerUser)}>
            <div className="form-group">
              <input
                {...register("name")}
                type="text"
                className="form-control"
                placeholder="Enter your name"
              />
              <span className="">{errors.name?.message}</span>
            </div>
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
              <input
                {...register("password2")}
                type="password"
                className="form-control"
                placeholder="Confirm password"
              />
              <span className="">{errors.password2?.message}</span>
            </div>
            <div className="form-group">
              <button disabled={!isValid || !isDirty} type="submit" className="btn btn block">
                Submit
              </button>
            </div>
          </form>
        </section>
      </>
    );
}

export default Register;