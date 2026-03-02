import { PlayIcon, InfoIcon } from './Icons';

const HeroBanner = ({ movie, onMoreInfo }) => {
  if (!movie) return null;

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        {movie.backdropPath ? (
          <img
            src={movie.backdropPath}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-900 to-gray-800" />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient" />
        {/* Left fade for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-12 pb-16 md:pb-24">
        <div className="max-w-2xl animate-slide-up">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {movie.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-4 text-sm md:text-base">
            <span className="text-green-400 font-semibold">
              {movie.rating ? `${movie.rating.toFixed(1)} Rating` : 'New'}
            </span>
            {movie.releaseDate && (
              <span className="text-gray-300">
                {new Date(movie.releaseDate).getFullYear()}
              </span>
            )}
            {movie.runtime && (
              <span className="text-gray-300">{movie.runtime} min</span>
            )}
          </div>

          {/* Overview */}
          <p className="text-gray-200 text-sm md:text-lg mb-6 line-clamp-3">
            {truncateText(movie.overview, 200)}
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="btn-primary flex items-center gap-2 text-sm md:text-base">
              <PlayIcon className="w-5 h-5" />
              Play
            </button>
            <button 
              onClick={onMoreInfo}
              className="btn-secondary flex items-center gap-2 text-sm md:text-base"
            >
              <InfoIcon className="w-5 h-5" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
