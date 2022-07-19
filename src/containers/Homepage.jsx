import { Box, Container } from "@mui/material";
import HeaderFooter from "../templates/HeaderFooter";
import { useEffect, useState } from "react";
import { getPopularMovies } from "../requests/tmdb";
import MovieCardDeck from "../components/MovieCardDeck";

export default function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getPopularMovies().then((data) => {
      setPopularMovies(data.data.results);
    });
  }, []);

  return (
    <HeaderFooter>
      <Box sx={{ paddingTop: "30px", paddingBottom: "30px" }}>
        <MovieCardDeck title="Popular Movies" items={popularMovies} />
      </Box>
    </HeaderFooter>
  );
}
