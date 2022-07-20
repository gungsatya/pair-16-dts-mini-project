import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import HeaderFooter from "../templates/HeaderFooter";
import { useEffect, useState } from "react";
import { getDetail, getImageUrl } from "../requests/tmdb";

export default function PeopleDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    if (params.id !== null) {
      getDetail("person", params.id).then((response) =>
        setDetail(response.data)
      );
    }
  }, [params, navigate]);

  return (
    <HeaderFooter>
      <Box
        sx={{
          padding: "30px 0",
          width: "100%",
        }}
      >
        <Container maxWidth="xl">
          <Card sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              sx={{ width: "30%" }}
              image={getImageUrl(detail.profile_path)}
              alt="Profile Picture"
            />
            <CardContent sx={{ padding: "50px 80px" }}>
              <Stack direction="column" spacing={5}>
                <Box>
                  <Typography variant="h2">{detail.name}</Typography>
                  <Typography variant="subtitle1">
                    {detail.known_for_department}
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {detail.biography}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Born in {detail.place_of_birth} on{" "}
                  {new Date(detail.birthday).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                </Typography>
                {detail.deathday && (
                  <Typography variant="body1" color="text.secondary">
                    Passaway on
                    {new Date(detail.deathday).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </HeaderFooter>
  );
}