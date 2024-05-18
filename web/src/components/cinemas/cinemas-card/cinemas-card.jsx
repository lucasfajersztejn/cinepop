import { Link } from "react-router-dom";
import recommended from "../../../assets/images/recommended.png"

function CinemasCard({ name, movieTheaters, description, avatar, id, priority }) {
  return (
    <>
      <Link className="relative text-white w-full rounded-3xl min-h-[340px] md:col-span-2 p-1 group overflow-hidden" to={`/cinemas/${id}`}>
        <figure className="w-full rounded-t-xl overflow-hidden">
          {priority === 1 ? (
            <div>
              <img className="relative w-full h-full min-h-[120px]  md:min-h-[350px] lg:min-h-[450px] object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-300" src={avatar} alt="movie poster" loading="lazy" />
              <img src={recommended} className="absolute h-20 top-3" alt="recommended" />
            </div> 
          ) : (
          <img className="w-full h-full min-h-[120px]  md:min-h-[350px] lg:min-h-[450px] object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-300" src={avatar} alt="movie poster" loading="lazy" />
          )}
        </figure>
        
        <div className="p-6 border border-slate-500 bg-slate-700 rounded-b-xl hover:bg-slate-600 shadow-lg">
          <h3 className="font-semibold underline text-xl ">{name}</h3>
          <p className="line-clamp-3 mt-4">{description}</p>
        </div>
      </Link>   
    </>
  )
}

export default CinemasCard;
