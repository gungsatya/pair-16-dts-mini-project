import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { getImageUrl } from "../requests/tmdb";

export default function MovieCard({ movie }) {
  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardMedia
          component="img"
          image={getImageUrl(movie.backdrop_path, "w300")}
          alt={`${movie.title} Backdrop`}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {movie.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
