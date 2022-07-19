import {
  Stack,
  Typography,
  styled,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getImageUrl } from "../requests/tmdb";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const StyledStack = styled(Stack)(({ theme }) => ({
  position: "relative",
  "&:hover .MuiPaper-root": {
    transform: "translateX(-25%)",
  },
}));

const StyledMovieCard = styled(Card)({
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
  "&:hover ~ &": {
    transform: "translateX(25%)",
  },
  "&:hover": {
    transform: "scale(1.5) !important",
  },
});

const PrevButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  width: "55px",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  border: 0,
  outline: 0,
  padding: 0,
  zIndex: 4,
  borderRadius: 0,
}));

const PADDINGS = 150;

export default function MovieCardDeck({ title, items = [] }) {
  const containerRef = useRef(null);
  const elementRef = useRef(null);

  const [elementWidth, setElementWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0);
  const [viewed, setViewed] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (elementRef.current) {
      setElementWidth(elementRef.current.clientWidth);
    }
  }, [elementRef]);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - PADDINGS;
      setContainerWidth(containerWidth);
      setTotalInViewport(Math.floor(containerWidth / elementWidth));
    }
  }, [containerRef, elementWidth]);

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

  const hasPrev = distance < 0;
  const hasNext = viewed + totalInViewport < items.length;

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={(theme) => ({
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
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
                <StyledMovieCard key={idx} ref={elementRef}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={getImageUrl(item.backdrop_path, "w300")}
                      alt={`${item.title} Backdrop`}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div" noWrap>
                        {item.title}
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
