import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth.context";
import bgCinema from "../assets/images/bgLogin.jpg"
import bgCinemaLogin from "../assets/images/bgCinemaLogin.png"
import bgCinemaLoginFinger from "../assets/images/bgCinemaLoginFingerTwo.jpeg"


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
    <div className="mt-40 lg:mt-44 xl:mt-48 mx-[5%] h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] flex flex-col md:flex-row justify-center items-center">
      <form 
        data-testid="login-form" 
        className="flex flex-col justify-center bg-no-repeat bg-cover border-2 h-60 lg:w-80 lg:h-80 xl:w-96 xl:h-96 border-slate-400 md:border-e-0 bg-slate-800 rounded-xl md:rounded-r-none md:rounded-l-xl p-4 mt-3" 
        style={{backgroundImage: `url(${bgCinemaLoginFinger})`}}
        onSubmit={handleSubmit(onSubmit)}
      >
        
        
        <div className="flex flex-col mb-3">
          <label htmlFor="email" className="text-white font-semibold text-xl shadow-lg mx-auto">
            Email
          </label>
          <input 
            required
            id="email"
            className="rounded-md text-xl p-1 bg-white/70"
            type="email"
            {...register("email")}
          />
        </div>

        <div className="flex flex-col mb-3">
          <label htmlFor="password" className="text-white font-semibold text-xl shadow-lg mx-auto">
            Password
          </label>
          <input
            required
            id="password"
            className="rounded-md text-xl p-1 bg-white/70"
            type="password"
            {...register("password")}
          />
        </div>

        <button type="submit" className="text-white font-bold text-xl bg-red-500 hover:bg-red-400 shadow-lg px-4 py-1 rounded-md mt-2">
          Login
        </button>
      </form>

      <div>
        <img src={bgCinema} className="hidden md:block md:rounded-e-xl border-2 border-slate-400 border-s-0 md:h-60 lg:h-80 xl:h-96 mt-3 " alt="Cinema theater background" />
      </div>
    </div>
  )
}

export default Login;