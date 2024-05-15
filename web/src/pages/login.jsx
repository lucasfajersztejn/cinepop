import { useForm } from "react-hook-form";


function Login() {
  const { register, handleSubmit, formState: { errors },} = useForm()

  return (
    <div className="mt-40 lg:mt-44 xl:mt-48 mx-[5%] flex flex-col items-center">

    </div>
  )
}

export default Login;