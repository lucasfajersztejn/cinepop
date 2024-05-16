import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { patchMovie } from "../../../services/api.service";


function EditMovie({ movie }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm(movie);

  async function onSubmit(data) {
    try {
      await patchMovie(movie.id ,data);
      // navigate(`/movies`);
      window.location.reload();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className="flex flex-col border border-slate-400 bg-slate-800 rounded-xl p-4 " onSubmit={handleSubmit(onSubmit)}>
      {/* TITLE */}
      <div className="flex flex-col mb-3">
        <span htmlFor="title" className="text-white underline me-2">Titulo</span>
        <input type="text" id="title" className="rounded p-1" defaultValue={movie.title} {...register("title")}/>
      </div>

      {/* OVERVIEW */}
      <div className="flex flex-col mb-3">
        <span htmlFor="overview" className="text-white underline me-2">Sinopsis</span>
        <textarea id="overview" className="w-full h-40 rounded p-1" {...register("overview")}>{movie.overview}</textarea>
      </div>
      
      {/* DURATION */}
      <div className="flex flex-col mb-3">
        <span htmlFor="runTime" className="text-white underline me-2">Duración</span>
        <input type="number" id="runTime" className="rounded p-1" defaultValue={movie.runTime} {...register("runTime")}/>
      </div>

      {/* CERTIFICATION */}
      {movie.certification &&
      <div className="flex flex-col mb-3">
        <span htmlFor="certification" className="text-white underline me-2">Calificación</span>
        <input type="text" id="certification" className="rounded p-1" defaultValue={movie.certification} {...register("certification")} />
      </div>
      }

      <button type="submit"  className="text-white bg-red-500 w-32 shadow-lg mx-auto py-1 rounded-md">Editar</button>

    </form>
  )
}

export default EditMovie;