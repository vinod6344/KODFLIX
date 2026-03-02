const axios = require('axios');

// Working placeholder images from placeholder.com and other reliable sources
const PLACEHOLDER_POSTER = "https://via.placeholder.com/500x750/141414/E50914?text=KodFlix";
const PLACEHOLDER_BACKDROP = "https://via.placeholder.com/1280x720/141414/333333?text=Movie+Backdrop";

// Sample movie data with reliable placeholder images
const sampleMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    posterPath: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1280&h=720&fit=crop",
    rating: 8.7,
    releaseDate: "1994-09-23",
    genreIds: [18, 80]
  },
  {
    id: 2,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    posterPath: "https://images.unsplash.com/photo-1594909122849-11daa2a0cf2b?w=500&h=750&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1280&h=720&fit=crop",
    rating: 8.7,
    releaseDate: "1972-03-14",
    genreIds: [18, 80]
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    posterPath: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1280&h=720&fit=crop",
    rating: 8.5,
    releaseDate: "2008-07-16",
    genreIds: [28, 80, 18]
  },
  {
    id: 4,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    posterPath: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&h=750&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1280&h=720&fit=crop",
    rating: 8.5,
    releaseDate: "1994-09-10",
    genreIds: [53, 80]
  },
  {
    id: 5,
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    posterPath: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1280&h=720&fit=crop",
    rating: 8.4,
    releaseDate: "2010-07-15",
    genreIds: [28, 878, 12]
  },
  {
    id: 6,
    title: "Fight Club",
    overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into much more.",
    posterPath: "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=500&h=750&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1550100136-e074fa43d818?w=1280&h=720&fit=crop",
    rating: 8.4,
    releaseDate: "1999-10-15",
    genreIds: [18]
  },
  {
    id: 7,
    title: "Forrest Gump",
    overview: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.",
    posterPath: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=500&h=750&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=1280&h=720&fit=crop",
    rating: 8.4,
    releaseDate: "1994-06-23",
    genreIds: [35, 18, 10749]
  },
  {
    id: 8,
    title: "The Matrix",
    overview: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth.",
    posterPath: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=750&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&h=720&fit=crop",
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
    posterPath: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=750&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1280&h=720&fit=crop",
    rating: 8.8,
    firstAirDate: "2008-01-20",
    genreIds: [18, 80]
  },
  {
    id: 102,
    title: "Game of Thrones",
    overview: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns.",
    posterPath: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=500&h=750&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=1280&h=720&fit=crop",
    rating: 8.3,
    firstAirDate: "2011-04-17",
    genreIds: [10765, 18, 10759]
  },
  {
    id: 103,
    title: "Stranger Things",
    overview: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
    posterPath: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=750&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1280&h=720&fit=crop",
    rating: 8.3,
    firstAirDate: "2016-07-15",
    genreIds: [10765, 18, 9648]
  },
  {
    id: 104,
    title: "The Office",
    overview: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes and inappropriate behavior.",
    posterPath: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&h=750&fit=crop",
    backdropPath: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&h=720&fit=crop",
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
