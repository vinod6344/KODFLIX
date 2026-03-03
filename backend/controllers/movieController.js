const axios = require('axios');

// Generate placeholder image URLs with movie titles
const getPosterUrl = (title) => `https://placehold.co/500x750/141414/E50914?text=${encodeURIComponent(title)}&font=playfair-display`;
const getBackdropUrl = (title) => `https://placehold.co/1280x720/1a1a1a/666666?text=${encodeURIComponent(title)}&font=playfair-display`;

// Sample movie data with generated placeholder images
const sampleMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    posterPath: getPosterUrl("The Shawshank Redemption"),
    backdropPath: getBackdropUrl("The Shawshank Redemption"),
    rating: 8.7,
    releaseDate: "1994-09-23",
    genreIds: [18, 80]
  },
  {
    id: 2,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    posterPath: getPosterUrl("The Godfather"),
    backdropPath: getBackdropUrl("The Godfather"),
    rating: 8.7,
    releaseDate: "1972-03-14",
    genreIds: [18, 80]
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    posterPath: getPosterUrl("The Dark Knight"),
    backdropPath: getBackdropUrl("The Dark Knight"),
    rating: 8.5,
    releaseDate: "2008-07-16",
    genreIds: [28, 80, 18]
  },
  {
    id: 4,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    posterPath: getPosterUrl("Pulp Fiction"),
    backdropPath: getBackdropUrl("Pulp Fiction"),
    rating: 8.5,
    releaseDate: "1994-09-10",
    genreIds: [53, 80]
  },
  {
    id: 5,
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    posterPath: getPosterUrl("Inception"),
    backdropPath: getBackdropUrl("Inception"),
    rating: 8.4,
    releaseDate: "2010-07-15",
    genreIds: [28, 878, 12]
  },
  {
    id: 6,
    title: "Fight Club",
    overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into much more.",
    posterPath: getPosterUrl("Fight Club"),
    backdropPath: getBackdropUrl("Fight Club"),
    rating: 8.4,
    releaseDate: "1999-10-15",
    genreIds: [18]
  },
  {
    id: 7,
    title: "Forrest Gump",
    overview: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.",
    posterPath: getPosterUrl("Forrest Gump"),
    backdropPath: getBackdropUrl("Forrest Gump"),
    rating: 8.4,
    releaseDate: "1994-06-23",
    genreIds: [35, 18, 10749]
  },
  {
    id: 8,
    title: "The Matrix",
    overview: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth.",
    posterPath: getPosterUrl("The Matrix"),
    backdropPath: getBackdropUrl("The Matrix"),
    rating: 8.2,
    releaseDate: "1999-03-30",
    genreIds: [28, 878]
  }
];

const tvShows = [
  {
    id: 101,
    title: "Breaking Bad",
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
    posterPath: getPosterUrl("Breaking Bad"),
    backdropPath: getBackdropUrl("Breaking Bad"),
    rating: 8.8,
    firstAirDate: "2008-01-20",
    genreIds: [18, 80]
  },
  {
    id: 102,
    title: "Game of Thrones",
    overview: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns.",
    posterPath: getPosterUrl("Game of Thrones"),
    backdropPath: getBackdropUrl("Game of Thrones"),
    rating: 8.3,
    firstAirDate: "2011-04-17",
    genreIds: [10765, 18, 10759]
  },
  {
    id: 103,
    title: "Stranger Things",
    overview: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
    posterPath: getPosterUrl("Stranger Things"),
    backdropPath: getBackdropUrl("Stranger Things"),
    rating: 8.3,
    firstAirDate: "2016-07-15",
    genreIds: [10765, 18, 9648]
  },
  {
    id: 104,
    title: "The Office",
    overview: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes and inappropriate behavior.",
    posterPath: getPosterUrl("The Office"),
    backdropPath: getBackdropUrl("The Office"),
    rating: 8.6,
    firstAirDate: "2005-03-24",
    genreIds: [35]
  }
];

// Get trending movies
const getTrending = async (req, res) => {
  try {
    // Return sample movies as trending
    res.json({ movies: sampleMovies.slice(0, 6) });
  } catch (error) {
    console.error('Error fetching trending movies:', error.message);
    res.status(500).json({ message: 'Failed to fetch trending movies' });
  }
};

// Get popular movies
const getPopular = async (req, res) => {
  try {
    // Return sample movies as popular
    res.json({ movies: sampleMovies.slice(2, 8) });
  } catch (error) {
    console.error('Error fetching popular movies:', error.message);
    res.status(500).json({ message: 'Failed to fetch popular movies' });
  }
};

// Get top rated movies
const getTopRated = async (req, res) => {
  try {
    // Return sample movies sorted by rating
    const sorted = [...sampleMovies].sort((a, b) => b.rating - a.rating);
    res.json({ movies: sorted });
  } catch (error) {
    console.error('Error fetching top rated movies:', error.message);
    res.status(500).json({ message: 'Failed to fetch top rated movies' });
  }
};

// Get popular TV shows
const getPopularTV = async (req, res) => {
  try {
    res.json({ shows: tvShows });
  } catch (error) {
    console.error('Error fetching popular TV shows:', error.message);
    res.status(500).json({ message: 'Failed to fetch popular TV shows' });
  }
};

// Get movie details by ID
const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const movieId = parseInt(id);
    
    // Find movie in sample data
    let movie = sampleMovies.find(m => m.id === movieId);
    
    // If not found in movies, check TV shows
    if (!movie) {
      movie = tvShows.find(s => s.id === movieId);
    }
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Add extra details
    const movieDetails = {
      ...movie,
      runtime: movie.runtime || 120,
      genres: movie.genres || ['Drama', 'Thriller'],
      tagline: movie.tagline || "An unforgettable journey",
      status: "Released",
      budget: 50000000,
      revenue: 250000000,
      cast: [
        { id: 1, name: "Actor One", character: "Main Character", profilePath: null },
        { id: 2, name: "Actor Two", character: "Supporting Role", profilePath: null },
        { id: 3, name: "Actor Three", character: "Villain", profilePath: null }
      ],
      trailer: { key: "dQw4w9WgXcQ", type: "Trailer", site: "YouTube" }
    };

    res.json({ movie: movieDetails });
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    res.status(500).json({ message: 'Failed to fetch movie details' });
  }
};

module.exports = {
  getTrending,
  getPopular,
  getTopRated,
  getPopularTV,
  getMovieDetails
};
