import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth.context";


function Login() {
  const navigate = useNavigate();
  const { doLogin } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors },} = useForm()

  async function onSubmit(data) {
    try {
      await doLogin(data);
      navigate("/");

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="mt-40 lg:mt-44 xl:mt-48 mx-[5%] flex flex-col items-center">
      <form data-testid="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input 
            required
            id="email"
            type="email"
            {...register("email")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            required
            id="password"
            type="password"
            {...register("password")}
          />
        </div>

        <button type="submit" className="text-white">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login;