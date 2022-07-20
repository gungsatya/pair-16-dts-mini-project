import { Box, Button, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../requests/tmdb";

const Content = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  height: "75vh",
  [theme.breakpoints.up("xl")]: {
    height: "50vh",
  },
}));

const Background = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}));

const BackgroundShadow = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  background: "#000",
  width: "30%",
  zIndex: 2,
  "&:before": {
    content: '""',
    position: "absolute",
    zIndex: 10,
    backgroundImage: "linear-gradient(to right,#000,transparent)",
    top: 0,
    bottom: 0,
    left: "100%",
    width: "275px",
  },
}));

const BackgroundImage = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  width: "70%",
  height: "100%",
  backgroundPosition: "center 15%",
  backgroundSize: "cover",
  zIndex: 1,
}));

const Area = styled(Box)(({ theme }) => ({
  left: 0,
  right: 0,
  height: "100%",
  zIndex: 3,
  marginTop: "10px",
  overflowY: "hidden",
  [theme.breakpoints.up("xl")]: {
    marginTop: "40px",
  },
}));
const AreaContainer = styled(Box)(({ theme }) => ({
  padding: "30px 70px",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
}));
const Overview = styled(Typography)(({ theme }) => ({
  maxWidth: "500px",
  marginTop: "30px",
}));

const Detail = styled(Button)(({ theme }) => ({
  marginTop: "30px",
}));

export default function HeroItem({ id, type, title, image, overview }) {
  const navigate = useNavigate();

  function goDetailPage() {
    navigate(`/src/${type}/detail/${id}`);
  }

  return (
    <Content>
      <Background>
        <BackgroundShadow />
        <BackgroundImage
          sx={{
            backgroundImage: `url(${getImageUrl(image, "w1280")})`,
          }}
        />
      </Background>
      <Area>
        <AreaContainer>
          <Title variant="h3">{title}</Title>
          <Overview variant="body1">{overview}</Overview>
          <Detail
            variant="outlined"
            color="error"
            onClick={() => goDetailPage()}
          >
            Detail
          </Detail>
        </AreaContainer>
      </Area>
    </Content>
  );
}
