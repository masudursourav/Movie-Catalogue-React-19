import PropTypes from "prop-types";

export default function MovieCard({
  movie: { poster_path, title, vote_average, original_language, release_date },
}) {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      />
      <div className="mt-4">
        <h3>{title}</h3>
      </div>
      <div className="content">
        <div className="rating">
          <img src="star.svg" alt="rating" />
          <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          <span className="flex w-2 h-2 bg-gray-200 rounded-full"></span>
          <p className="lang">{original_language}</p>
          <span className="flex w-2 h-2 bg-gray-200 rounded-full"></span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    original_language: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
  }).isRequired,
};
