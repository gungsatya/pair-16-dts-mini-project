import { Box, Container, Grid } from "@mui/material";
import HeaderFooter from "../templates/HeaderFooter";
import { useEffect, useState } from "react";
import { getPopularMovies } from "../requests/tmdb";
import MovieCard from "../components/MovieCard";

export default function HomePage() {
  // const [movieGenres, setMovieGenres] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    // getMovieGenres().then((data) => {
    //   setMovieGenres(data.data.genres);
    // });
    getPopularMovies().then((data) => {
      setPopularMovies(data.data.results);
    });
  }, []);

  return (
    <HeaderFooter>
      <Box sx={{ paddingTop: "30px", paddingBottom: "30px" }}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {popularMovies.map((movie, idx) => {
              return (
                <Grid key={idx} item xs={12} sm={3} xl={2}>
                  <MovieCard movie={movie} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </HeaderFooter>
  );
}
