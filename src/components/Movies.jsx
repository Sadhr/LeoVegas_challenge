import Movie from "./Movie";
import "../styles/movies.scss";

const Movies = ({ movies, viewTrailer, closeCard }) => {
  return (
    <div data-testid="movies" className="movies_wrapper">
      {movies.movies.results?.map((movie, idx) => {
        return (
          <Movie
            movie={movie}
            key={movie.id + "/" + idx}
            viewTrailer={viewTrailer}
            closeCard={closeCard}
          />
        );
      })}
    </div>
  );
};

export default Movies;
