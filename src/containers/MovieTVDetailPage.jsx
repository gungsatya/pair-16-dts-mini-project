import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import HeaderFooter from "../templates/HeaderFooter";
import { useEffect, useState } from "react";
import YoutubeVideoStack from "../components/YoutubeVideoStack";
import { getDetail, getSimilar } from "../requests/tmdb";
import ItemCardDeck from "../components/ItemCardDeck";

export default function MovieTVDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [type, setType] = useState(null);
  const [id, setId] = useState(null);
  const [detail, setDetail] = useState({});
  const [similars, setSimilar] = useState([]);

  useEffect(() => {
    function pageTypeTranslation(pageType) {
      switch (pageType) {
        case "movies":
          return "movie";
        case "tv-shows":
          return "tv";
        default:
          return pageType;
      }
    }
    if (
      params.type !== "movies" &&
      params.type !== "tv-shows" &&
      params.type !== "tv" &&
      params.type !== "movie"
    )
      navigate("/404");
    setType(pageTypeTranslation(params.type));
    setId(params.id);
  }, [params, navigate]);

  useEffect(() => {
    function detailTranslation(detail) {
      switch (type) {
        case "movie":
          return {
            title: detail.original_title,
            image: detail.backdrop_path,
            overview: detail.overview,
            tagline: detail.tagline,
          };
        case "tv":
          return {
            title: detail.original_name,
            image: detail.backdrop_path,
            overview: detail.overview,
            tagline: detail.tagline,
          };
        default:
          return detail;
      }
    }
    if (type !== null && id !== null) {
      getDetail(type, id).then((response) =>
        setDetail(detailTranslation(response.data))
      );
      getSimilar(type, id).then((response) =>
        setSimilar(response.data.results)
      );
    }
  }, [id, type]);

  return (
    <HeaderFooter>
      <Box
        sx={{
          padding: "30px 0",
          width: "100%",
        }}
      >
        <Container maxWidth="xl" sx={{ marginBottom: "70px" }}>
          <Stack direction="column" gap={4}>
            <Stack direction="column" gap={1}>
              <Typography variant="h2">{detail.title}</Typography>
              <Typography variant="subtitle1">{detail.tagline}</Typography>
            </Stack>
            <YoutubeVideoStack type={type} id={id} image={detail.image} />
            <Stack direction="column" gap={2}>
              <Typography variant="h4">Overview</Typography>
              <Typography variant="body1">{detail.overview}</Typography>
            </Stack>
          </Stack>
        </Container>
        <Divider sx={{ marginBottom: "50px" }} />
        <ItemCardDeck
          type={type}
          item_name={type === "movie" ? "original_title" : "original_name"}
          title="Similar"
          items={similars}
          image="backdrop_path"
        />
        <Divider sx={{ marginTop: "50px" }} />
      </Box>
    </HeaderFooter>
  );
}
