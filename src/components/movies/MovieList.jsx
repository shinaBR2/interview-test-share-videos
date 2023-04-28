import { Container } from "@mui/material";
import MovieItem from "./MovieItem";

const MovieList = (props) => {
  const { list } = props;

  return (
    <Container>
      {list.map(v => <MovieItem key={v.id} video={v} />)}
    </Container>
  )
};

export default MovieList;