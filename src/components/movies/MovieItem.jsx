import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const MovieItem = (props) => {
  const { video } = props;
  const { id, url } = video;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="iframe"
          src={url}
          height="345"
          alt={`video-${id}`}
        />
      </CardActionArea>
    </Card>
  )
};

export default MovieItem;