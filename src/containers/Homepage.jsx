import { Box } from "@mui/material";
import HeaderFooter from "../templates/HeaderFooter";
import { useEffect, useState } from "react";
import {
  getPopularMovies,
  getPopularPerson,
  getPopularTV,
  getTrendingToday,
} from "../requests/tmdb";
import ItemCardDeck from "../components/ItemCardDeck";
import Carousel from "react-material-ui-carousel";
import HeroItem from "../components/HeroItem";

export default function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [popularPerson, setPopularPerson] = useState([]);
  const [trendings, setTrendings] = useState([]);

  useEffect(() => {
    getPopularMovies().then((data) => {
      setPopularMovies(data.data.results);
    });
    getPopularTV().then((data) => {
      setPopularTV(data.data.results);
    });
    getPopularPerson().then((data) => {
      setPopularPerson(data.data.results);
    });
    getTrendingToday().then((data) => {
      setTrendings(data.data.results);
    });
  }, []);

  return (
    <HeaderFooter>
      <Box
        sx={{
          paddingTop: "30px",
          paddingBottom: "30px",
          width: "100%",
        }}
      >
        <Carousel>
          {trendings.map((item) => (
            <HeroItem
              key={item.id}
              id={item.id}
              type={item.media_type}
              title={item.media_type === "movie" ? item.title : item.name}
              overview={item.overview}
              image={item.backdrop_path}
            />
          ))}
        </Carousel>
        <ItemCardDeck title="Popular Movies" items={popularMovies} />
        <ItemCardDeck
          type="tv"
          item_name="original_name"
          title="Popular TV"
          items={popularTV}
        />
        <ItemCardDeck
          type="person"
          item_name="name"
          title="Popular Person"
          items={popularPerson}
          image="profile_path"
        />
      </Box>
    </HeaderFooter>
  );
}
