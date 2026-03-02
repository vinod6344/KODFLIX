import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, isTvShow = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  // Format rating to one decimal place
  const formattedRating = movie.rating ? movie.rating.toFixed(1) : 'N/A';

  // Get year from release date
  const year = movie.releaseDate 
    ? new Date(movie.releaseDate).getFullYear() 
    : movie.firstAirDate 
      ? new Date(movie.firstAirDate).getFullYear() 
      : null;

  return (
    <div 
      onClick={handleClick}
      className="movie-card relative flex-shrink-0 w-36 sm:w-40 md:w-48 cursor-pointer rounded-md overflow-hidden bg-netflix-dark"
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {movie.posterPath ? (
          <img 
            src={movie.posterPath} 
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded">
          <span className={`text-sm font-bold ${
            movie.rating >= 7 ? 'text-green-400' : 
            movie.rating >= 5 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {formattedRating}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 transition-all duration-300 flex items-end p-3">
          <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white font-semibold text-sm line-clamp-2">
              {movie.title}
            </h3>
            {year && (
              <p className="text-gray-300 text-xs mt-1">{year}</p>
            )}
          </div>
        </div>
      </div>

      {/* Title below poster (always visible) */}
      <div className="p-2">
        <h3 className="text-white text-sm font-medium truncate">
          {movie.title}
        </h3>
        {isTvShow && (
          <span className="text-xs text-netflix-gray">TV Series</span>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
