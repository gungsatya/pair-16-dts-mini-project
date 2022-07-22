import {
  Stack,
  Typography,
  styled,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Box,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getImageUrl } from "../requests/tmdb";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { Image } from "mui-image";

const StyledStack = styled(Stack)(({ theme }) => ({
  position: "relative",
  "&:hover .MuiPaper-root": {
    transform: "translateX(-20%)",
  },
}));

const StyledMovieCard = styled(Card)(({ theme }) => ({
  position: "relative",
  flex: "0 0 80%",
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
  "&:hover ~ &": {
    transform: "translateX(20%)",
  },
  "&:hover": {
    transform: "scale(1.2) !important",
  },
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 40%",
  },
  [theme.breakpoints.up("md")]: {
    flex: "0 0 30%",
  },
  [theme.breakpoints.up("xl")]: {
    flex: "0 0 15%",
  },
}));

const PrevButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  width: "55px",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  border: 0,
  outline: 0,
  padding: 0,
  zIndex: 4,
  borderRadius: 0,
}));

const NextButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  width: "55px",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  border: 0,
  outline: 0,
  padding: 0,
  zIndex: 4,
  borderRadius: 0,
}));

const PADDINGS = 150;

export default function ItemCardDeck({
  title,
  items = [],
  type = "movie",
  item_name = "title",
  image = "backdrop_path",
}) {
  const navigate = useNavigate();
  const [elementWidth, setElementWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useCallback(
    (node) => {
      if (node !== null) {
        const containerWidth = node.getBoundingClientRect().width - PADDINGS;
        setContainerWidth(containerWidth);
        setTotalInViewport(Math.floor(containerWidth / elementWidth));
      }
    },
    [elementWidth]
  );
  const elementRef = useCallback((node) => {
    if (node !== null) {
      setElementWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const [totalInViewport, setTotalInViewport] = useState(0);
  const [viewed, setViewed] = useState(0);
  const [distance, setDistance] = useState(0);

  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    setHasPrev(distance < 0);
  }, [distance]);

  useEffect(() => {
    setHasNext(viewed + totalInViewport < items.length);
  }, [viewed, totalInViewport, items]);

  const handlePrev = () => {
    setViewed(viewed - totalInViewport);
    setDistance(distance + containerWidth);
  };

  const handleNext = () => {
    setViewed(viewed + totalInViewport);
    setDistance(distance - containerWidth);
  };

  const slideProps = {
    style: { transform: `translate3d(${distance}px, 0, 0)` },
  };

  function goDetailPage(id) {
    navigate(`/src/${type}/detail/${id}`);
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={(theme) => ({
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        width: "100%",
        maxWidth: "100vw",
        overflowX: { xs: "hidden", xl: "inherit" },
      })}
    >
      <Box sx={{ padding: "0 50px" }}>
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          position: "relative",
        }}
      >
        <Box sx={{ padding: "0 50px" }}>
          <StyledStack
            direction="row"
            spacing={1}
            {...slideProps}
            ref={containerRef}
          >
            {items.map((item, idx) => {
              return (
                <StyledMovieCard key={idx} ref={elementRef} variant="outlined">
                  <CardActionArea onClick={() => goDetailPage(item.id)}>
                    {item[item_name] && (
                      <Image
                        showLoading
                        src={getImageUrl(item[image], "w300")}
                        alt={`${item[item_name]} Backdrop`}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6" component="div" noWrap>
                        {item[item_name]}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </StyledMovieCard>
              );
            })}
          </StyledStack>
        </Box>
        {hasPrev && (
          <PrevButton
            onClick={handlePrev}
            size="large"
            children={<ArrowBackIosNewIcon />}
          />
        )}

        {hasNext && (
          <NextButton
            onClick={handleNext}
            size="large"
            children={<ArrowForwardIosIcon />}
          />
        )}
      </Box>
    </Stack>
  );
}
