import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import MovieItem from "./MovieItem";

const MovieList = (props) => {
  const { list, isLoading } = props;

  if (isLoading || 1) {
    return (
      <Container>
        <Grid container direction="column" justifyContent="center" sx={{ width: '100%', height: "150px" }}>
          <LinearProgress />
        </Grid>
      </Container>
    )
  }

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