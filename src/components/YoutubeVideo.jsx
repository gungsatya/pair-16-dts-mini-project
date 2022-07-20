import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function YoutubeVideo({ title, typeVideo, youtubeKey }) {
  return (
    <Card>
      <CardMedia
        component="iframe"
        alt="Youtube Video"
        src={`https://www.youtube.com/embed/${youtubeKey}`}
        sx={{ height: "480px", objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {typeVideo}
        </Typography>
      </CardContent>
    </Card>
  );
}
