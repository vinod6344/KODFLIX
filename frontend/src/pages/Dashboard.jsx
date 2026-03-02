import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosConfig';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';

const Dashboard = () => {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch all movie categories in parallel
      const [trendingRes, popularRes, topRatedRes, popularTVRes] = await Promise.all([
        api.get('/movies/trending'),
        api.get('/movies/popular'),
        api.get('/movies/top-rated'),
        api.get('/movies/tv/popular')
      ]);

      const trendingMovies = trendingRes.data.movies || [];
      const popularMovies = popularRes.data.movies || [];
      const topRatedMovies = topRatedRes.data.movies || [];
      const tvShows = popularTVRes.data.shows || [];

      setTrending(trendingMovies);
      setPopular(popularMovies);
      setTopRated(topRatedMovies);
      setPopularTV(tvShows);

      // Set featured movie from trending (first movie)
      if (trendingMovies.length > 0) {
        // Fetch full details for the featured movie
        const featuredId = trendingMovies[0].id;
        try {
          const featuredRes = await api.get(`/movies/${featuredId}`);
          setFeaturedMovie(featuredRes.data.movie);
        } catch (err) {
          // If details fetch fails, use basic info from trending
          setFeaturedMovie(trendingMovies[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to load movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleMoreInfo = () => {
    if (featuredMovie) {
      navigate(`/movie/${featuredMovie.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-400">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-netflix-red text-xl mb-4">{error}</p>
          <button 
            onClick={fetchAllMovies}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black pb-12">
      {/* Hero Banner */}
      <HeroBanner 
        movie={featuredMovie} 
        onMoreInfo={handleMoreInfo}
      />

      {/* Movie Rows */}
      <div className="-mt-16 relative z-10">
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="Popular Movies" movies={popular} />
        <MovieRow title="Top Rated" movies={topRated} />
        <MovieRow title="Popular TV Shows" movies={popularTV} isTvShow={true} />
      </div>
    </div>
  );
};

export default Dashboard;
