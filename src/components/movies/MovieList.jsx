import { Container, Typography } from "@mui/material";
import MovieItem from "./MovieItem";

const MovieList = (props) => {
  const { list } = props;

  if (!list || !list.length) {
    return (
      <Container>
        <Typography>There are no movies</Typography>
      </Container>
    )
  }

  return (
    <Container>
      {list.map(v => <MovieItem key={v.id} video={v} />)}
    </Container>
  )
};

export default MovieList;