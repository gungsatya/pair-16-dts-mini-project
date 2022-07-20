import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  getImageUrl,
  getNowPlayingMovies,
  getOnTheAirTV,
  getPopularPersons,
} from "../requests/tmdb";
import HeaderFooter from "../templates/HeaderFooter";

const StyledMovieCard = styled(Card)({
  zIndex: 1,
  position: "relative",
  flex: "0 0 15%",
  transition: "transform 300ms ease 100ms",
  "& .MuiCardContent-root": {
    opacity: 0.5,
    transition: "opacity 1s ease-in-out",
    MozTransition: "opacity 1s ease-in-out",
    WebkitTransition: "opacity 1s ease-in-out",
  },
  "&:hover .MuiCardContent-root": {
    opacity: 1.0,
    transition: "opacity .55s ease-in-out",
    MozTransition: "opacity .55s ease-in-out",
    WebkitTransition: "opacity .55s ease-in-out",
  },
});

export default function ItemMainPage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [pageType, setPageType] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const [queryStrings, setQueryString] = useSearchParams();

  useEffect(() => {
    const currentPage = queryStrings.get("page")
      ? parseInt(queryStrings.get("page"))
      : 1;
    setPageType(params.type);

    switch (params.type) {
      case "movies":
        getNowPlayingMovies(currentPage).then((data) => {
          if (currentPage === 1) {
            setItems(data.data.results);
          } else {
            setItems((old) => [...old, ...data.data.results]);
          }
          setStartDate(new Date(data.data.dates.minimum));
          setEndDate(new Date(data.data.dates.maximum));
          setTotalPages(data.data.total_pages);
          setPage(currentPage);
        });
        break;
      case "tv-shows":
        getOnTheAirTV(currentPage).then((data) => {
          if (currentPage === 1) {
            setItems(data.data.results);
          } else {
            setItems((old) => [...old, ...data.data.results]);
          }
          setTotalPages(data.data.total_pages);
          setPage(currentPage);
        });
        break;
      case "persons":
        getPopularPersons(currentPage).then((data) => {
          if (currentPage === 1) {
            setItems(data.data.results);
          } else {
            setItems((old) => [...old, ...data.data.results]);
          }
          setTotalPages(data.data.total_pages);
          setPage(currentPage);
        });
        break;

      default:
        navigate("/404");
        break;
    }
  }, [params, queryStrings, navigate]);

  useEffect(() => {
    setHasNext(totalPages - page > 0);
  }, [totalPages, page]);

  function pageTitle() {
    switch (pageType) {
      case "movies":
        return `Now Playing Movies`;
      case "tv-shows":
        return `TV Shows on The Air`;
      case "persons":
        return "Popular Persons";
      default:
        return "Search";
    }
  }

  function itemInterpreter(item) {
    let title = "";
    let image = "";

    switch (pageType) {
      case "movies":
        title = item["original_title"];
        break;
      case "tv-shows":
        title = item["original_name"];
        break;
      case "persons":
        title = item["name"];
        break;

      default:
        title = "";
        break;
    }

    switch (pageType) {
      case "movies":
        image = item["backdrop_path"];
        break;
      case "tv-shows":
        image = item["backdrop_path"];
        break;
      case "persons":
        image = item["profile_path"];
        break;

      default:
        image = "";
        break;
    }

    return {
      title: title,
      image: image,
    };
  }

  function goNextPage() {
    setQueryString({
      ...queryStrings,
      page: page + 1,
    });
  }

  function goDetailPage(id, type = null) {
    type = type ?? pageType;
    navigate(`/src/${type}/detail/${id}`);
  }

  const dateFormat = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <HeaderFooter>
      <Box
        sx={{
          padding: "30px 50px",
          width: "100%",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Box>
            <Typography variant="h3">{pageTitle()}</Typography>
            {pageType === "movies" && (
              <Typography variant="body1" sx={{ marginTop: "20px" }}>
                {startDate.toLocaleDateString("en-US", dateFormat)} -{" "}
                {endDate.toLocaleDateString("en-US", dateFormat)}
              </Typography>
            )}
          </Box>
          <Grid container spacing={1}>
            {items.map((item, idx) => {
              const interpredItem = itemInterpreter(item);
              return (
                <Grid key={idx} item xs={6} md={3}>
                  <StyledMovieCard variant="outlined">
                    <CardActionArea onClick={(e) => goDetailPage(item.id)}>
                      <CardMedia
                        component="img"
                        image={getImageUrl(interpredItem.image, "w300")}
                        alt={`${interpredItem.title} Backdrop`}
                      />
                      <CardContent>
                        <Typography variant="h6" component="div" noWrap>
                          {interpredItem.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </StyledMovieCard>
                </Grid>
              );
            })}
          </Grid>
          {hasNext && (
            <Button onClick={goNextPage} variant="outlined" size="large">
              Load More
            </Button>
          )}
        </Stack>
      </Box>
    </HeaderFooter>
  );
}
