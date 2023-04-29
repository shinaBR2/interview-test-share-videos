import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import MovieItem from "./MovieItem";

const MovieList = (props) => {
  const { list, isLoading } = props;

  if (isLoading) {
    return (
      <Container>
        <Grid
          container
          direction="column"
          justifyContent="center"
          sx={{ width: "100%", height: "150px" }}
        >
          <LinearProgress />
        </Grid>
      </Container>
    );
  }

  if (!list || !list.length) {
    return (
      <Container>
        <Typography>There are no movies</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container alignItems="center" spacing={2} my={4} role="list">
        {list.map((v) => (
          <Grid key={v.id} role="listitem" item container width="100%" justifyContent="center">
            <MovieItem video={v} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieList;
