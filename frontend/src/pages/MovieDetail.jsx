import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axiosConfig';
import { PlayIcon, StarIcon, ClockIcon, CalendarIcon, ArrowLeftIcon } from '../components/Icons';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(`/movies/${id}`);
      setMovie(response.data.movie);
    } catch (err) {
      console.error('Error fetching movie details:', err);
      setError('Failed to load movie details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount) => {
    if (!amount) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-netflix-red text-xl mb-4">{error || 'Movie not found'}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="fixed top-20 left-4 md:left-12 z-50 flex items-center gap-2 text-white hover:text-gray-300 transition-colors bg-black/50 px-4 py-2 rounded"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Back
      </button>

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh]">
        {/* Background */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-12 pb-8">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Poster */}
            {movie.posterPath && (
              <div className="hidden md:block flex-shrink-0">
                <img
                  src={movie.posterPath}
                  alt={movie.title}
                  className="w-48 lg:w-64 rounded-lg shadow-2xl"
                />
              </div>
            )}

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-gray-400 text-lg italic mb-4">{movie.tagline}</p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm md:text-base">
                {movie.rating && (
                  <div className="flex items-center gap-1 text-yellow-400">
                    <StarIcon className="w-5 h-5" />
                    <span className="font-semibold">{movie.rating.toFixed(1)}</span>
                  </div>
                )}

                {movie.runtime && (
                  <div className="flex items-center gap-1 text-gray-300">
                    <ClockIcon className="w-5 h-5" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}

                {movie.releaseDate && (
                  <div className="flex items-center gap-1 text-gray-300">
                    <CalendarIcon className="w-5 h-5" />
                    <span>{new Date(movie.releaseDate).getFullYear()}</span>
                  </div>
                )}

                {movie.status && (
                  <span className="text-gray-400">{movie.status}</span>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button className="btn-primary flex items-center gap-2">
                  <PlayIcon className="w-5 h-5" />
                  Play Now
                </button>
                {movie.trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${movie.trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2"
                  >
                    Watch Trailer
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-4 md:px-12 py-8">
        {/* Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed max-w-4xl">
            {movie.overview || 'No overview available.'}
          </p>
        </div>

        {/* Financial Info */}
        {(movie.budget || movie.revenue) && (
          <div className="mb-8 grid md:grid-cols-2 gap-4 max-w-2xl">
            {movie.budget > 0 && (
              <div className="bg-gray-800/50 p-4 rounded">
                <p className="text-gray-400 text-sm">Budget</p>
                <p className="text-white text-lg font-semibold">{formatCurrency(movie.budget)}</p>
              </div>
            )}
            {movie.revenue > 0 && (
              <div className="bg-gray-800/50 p-4 rounded">
                <p className="text-gray-400 text-sm">Revenue</p>
                <p className="text-white text-lg font-semibold">{formatCurrency(movie.revenue)}</p>
              </div>
            )}
          </div>
        )}

        {/* Cast */}
        {movie.cast && movie.cast.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Top Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movie.cast.map((actor) => (
                <div key={actor.id} className="text-center">
                  {actor.profilePath ? (
                    <img
                      src={actor.profilePath}
                      alt={actor.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mx-auto mb-2"
                    />
                  ) : (
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-700 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-gray-500 text-2xl">👤</span>
                    </div>
                  )}
                  <p className="text-white text-sm font-medium">{actor.name}</p>
                  <p className="text-gray-400 text-xs">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
