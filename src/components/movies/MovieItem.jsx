import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const MovieItem = (props) => {
  const { video } = props;
  const { id, url } = video;

  return (
    <Card sx={{ width: 614 }}>
      <CardMedia
        component="iframe"
        src={url}
        height="345"
        width="614"
        alt={`video-${id}`}
      />
    </Card>
  );
};

export default MovieItem;
