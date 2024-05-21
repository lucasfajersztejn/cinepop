
function CastCards({ name, character, profile_path}) {
  return (
    <div className="flex flex-wrap gap-5 items-center mb-5">
      <div className='avatar'>
          <div className='w-10 sm:w-20 rounded'>
            <img src={`https://image.tmdb.org/t/p/original/${profile_path}`} alt={`photo of ${name}`} />
          </div>
      </div>

      <div className='flex flex-col text-xs sm:text-lg '>
          <span className='font-bold'>{name}</span>
          <span className='font-normal'>{character}</span>
      </div>
    </div>
  )
}

export default CastCards;