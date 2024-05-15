import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { patchMovie } from "../../../services/api.service";


function EditMovie({ movie }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm(movie);

  async function onSubmit(data) {
    try {
      await patchMovie(movie.id ,data);
      navigate(`/movies/${movie.id}`);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* TITLE */}
      <div className="mb-3">
        <span htmlFor="title" className="text-white me-2">Titulo</span>
        <input type="text" id="title" {...register("title")}/>
      </div>

      {/* OVERVIEW */}
      <div className="mb-3">
        <span htmlFor="overview" className="text-white me-2">Sinopsis</span>
        <textarea id="overview" className="w-full h-40" {...register("overview")}>{movie.overview}</textarea>
      </div>
      
      {/* Duration */}
      <div className="">
        <span htmlFor="runTime" className="text-white me-2">Duración</span>
        <input type="number" id="runTime" placeholder={movie.runTime} {...register("runTime")}/>
      </div>

      {/* DURATION */}
      <div></div>

      <button type="submit" className="text-white">Editar</button>

    </form>
  )
}

export default EditMovie;