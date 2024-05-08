import { Link } from "react-router-dom";

function CinemasCard({ name, movieTheaters, description, avatar, id }) {
  return (
    <>
      <Link className="relative dark:bg-red-950  w-full rounded-3xl min-h-[340px] md:col-span-2 p-1 group overflow-hidden" to={`/cinemas/${id}`}>
        <figure className="w-full rounded-3xl h-2/3 overflow-hidden">
          <img className="w-full h-full min-h-[120px]  md:min-h-[350px] lg:min-h-[450px] object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-300" src={avatar} alt="movie poster" loading="lazy" />
        </figure>
        
        <div className="p-6">
          <h3 className="font-bold text-lg ">{name}</h3>
          <p className="line-clamp-3 mt-4">{description}</p>
        </div>
      </Link>   
    </>
  )
}

export default CinemasCard;
