import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3/";

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.params = {
      ...config.params,
      api_key: process.env.REACT_APP_TMDB_API_KEY,
    };
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;
    config.baseURL = TMDB_BASE_URL;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const getImageUrl = (path, size = "original") => {
  return path != null
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "http://via.placeholder.com/170x96";
};

const getMovieGenres = () => {
  return axios.get("/genre/movie/list");
};

const getPopularMovies = (page = 1) => {
  return axios.get("/movie/popular", {
    params: {
      page: page,
    },
  });
};

const getPopularTV = (page = 1) => {
  return axios.get("/tv/popular", {
    params: {
      page: page,
    },
  });
};

const getPopularPersons = (page = 1) => {
  return axios.get("/person/popular", {
    params: {
      page: page,
    },
  });
};

const getTopRatedMovies = (page = 1) => {
  return axios.get("/movie/top_rated", {
    params: {
      page: page,
    },
  });
};

const getTrendingToday = () => {
  return axios.get("/trending/all/day");
};

const getNowPlayingMovies = (page = 1) => {
  return axios.get("/movie/now_playing", {
    params: {
      page: page,
    },
  });
};

const getOnTheAirTV = (page = 1) => {
  return axios.get("/tv/on_the_air", {
    params: {
      page: page,
    },
  });
};

export {
  TMDB_BASE_URL,
  getImageUrl,
  getMovieGenres,
  getPopularMovies,
  getPopularTV,
  getTopRatedMovies,
  getPopularPersons,
  getTrendingToday,
  getNowPlayingMovies,
  getOnTheAirTV,
};
