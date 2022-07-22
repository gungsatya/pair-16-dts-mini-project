import { useEffect, useState } from "react";
import { getImageUrl, getVideos } from "../requests/tmdb";
import PropTypes from "prop-types";
import YoutubeVideo from "./YoutubeVideo";
import { Box, Card, Tab, Tabs } from "@mui/material";
import { Image } from "mui-image";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: "10px 0" }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function YoutubeVideoStack({ type, id, image }) {
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveIndex(newValue);
  };

  useEffect(() => {
    if (type !== null && id !== null) {
      getVideos(type, id).then((response) => {
        const data = response.data;
        setVideos(data.results.filter((video) => video.site !== "Youtube"));
      });
    }
  }, [type, id]);

  return (
    <>
      {videos.length > 0 && (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              value={activeIndex}
              onChange={handleChange}
              aria-label="Youtube Video Stack Tabs"
            >
              {videos.map((video, idx) => {
                return <Tab key={idx} label={video.type} {...a11yProps(idx)} />;
              })}
            </Tabs>
          </Box>

          {videos.map((video, idx) => {
            return (
              <TabPanel key={idx} value={activeIndex} index={idx}>
                <YoutubeVideo
                  title={video.name}
                  typeVideo={video.type}
                  youtubeKey={video.key}
                />
              </TabPanel>
            );
          })}
        </Box>
      )}
      {videos.length < 1 && (
        <Card>
          <Image
            showLoading
            alt="Backdrop"
            src={getImageUrl(image, "w1280")}
            sx={{ height: "480px", objectFit: "contain" }}
          />
        </Card>
      )}
    </>
  );
}
