import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { patchCinema } from "../../../../services/api.service";

function EditCinema({ cinema }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm(cinema);

  async function onSubmit(data) {
    try {
      await patchCinema(cinema.id, data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 p-3 justify-start border border-slate-500 bg-slate-800/70 rounded-xl w-full">
     {/* NAME */}
     <div className="flex flex-col mb-3">
        <span htmlFor="name" className="text-white underline me-2">Nombre</span>
        <input type="text" id="name" className="rounded p-1" defaultValue={cinema.name} {...register("name")}/>
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col mb-3">
        <span htmlFor="description" className="text-white underline me-2">Descripción</span>
        <textarea id="description" className="w-full h-40 rounded p-1" {...register("description")}  defaultValue={cinema.description}></textarea>
      </div>
      
      {/* CATEGORY */}
      <div className="flex flex-col mb-3">
        <span htmlFor="category" className="text-white underline me-2">Categoría</span>
        <select id="category" className="rounded p-1" {...register("category")}>
          <option value="Small">Pequeño</option>
          <option value="Medium">Mediano</option>
          <option value="Big">Grande</option>
        </select>
      </div>

      {/* WEB */}
      {cinema.web &&
      <div className="flex flex-col mb-3">
        <span htmlFor="web" className="text-white underline me-2">Web</span>
        <input type="text" id="web" className="rounded p-1" defaultValue={cinema.web} {...register("web")} />
      </div>
      }

      {/* ADDRESS */}
      <div className="flex flex-col mb-3">
        <span htmlFor="address" className="text-white underline me-2">Dirección</span>
        <input type="text" id="address" className="rounded p-1" defaultValue={cinema.address} {...register("address")}/>
      </div>

      {/* PRIORITY */}
      <div className="flex flex-col mb-3">
        <span htmlFor="priority" className="text-white underline me-2">Prioridad</span>
        <input type="number" id="priority" className="rounded p-1" min={1} defaultValue={cinema.priority} {...register("priority")}/>
      </div>

      <button type="submit"  className="text-white bg-red-500 w-32 shadow-lg mx-auto py-1 rounded-md">Editar</button>

    </form>
  )
}

export default EditCinema;