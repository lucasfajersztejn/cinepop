function FilmsInTheaters({
  filterMovie,
  availableHours,
  handleHourPicked,
  handleTicketPrice,
  totalPrice,
  hourSelected,
}) {
  return (
    <div
      key={filterMovie.idMovie}
      className="flex flex-col lg:flex-row items-center lg:gap-5 mt-3"
    >
      <img
        className="rounded-3xl w-1/2 md:w-1/3 lg:w-1/5"
        src={`https://image.tmdb.org/t/p/original/${filterMovie.poster_path}`}
        alt="Poster image"
      />

      <div className="flex flex-col gap-3">
        <h2 className="text-white font-semibold text-2xl">
          {filterMovie.title}
        </h2>
        <p className="text-white text-lg">{filterMovie.overview}</p>

        <div className="flex flex-wrap gap-2">
          {availableHours.map((hour, index) => (
            <span
              key={index}
              className={`text-white bg-red-500 hover:bg-red-400 rounded-3xl ring-red-300 ring-2 p-2 
              ${
                hourSelected === index
                  ? " bg-teal-600 hover:bg-teal-400"
                  : "bg-red-500"
              }`}
              onClick={() => handleHourPicked(index)}
            >
              {hour}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-5 lg:flex-col lg:gap-2 justify-center items-center">
        <span className="text-white font-medium text-lg">Entradas</span>
        <input
          type="number"
          className="p-2 w-16"
          min={0}
          onClick={handleTicketPrice}
        />
      </div>

      <div>
        <h3 className="bg-white text-black text-2xl font-bold p-2">
          {totalPrice} €
        </h3>
      </div>
    </div>
  );
}

export default FilmsInTheaters;
