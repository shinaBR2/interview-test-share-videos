import { render, screen, within } from "@testing-library/react";
import MovieList from "./MovieList";

describe("Movie listing", () => {
  const movies = [
    {
      id: '-NU5Sm9kkA4nJnPI1E-U',
      url: 'https://www.youtube.com/embed/BoWPSgz4Hx8'
    },
    {
      id: '-NU5UDRSvzLptGwKns13',
      url: 'https://www.youtube.com/embed/9jbi7XdFV5o'
    },
    {
      id: '-NU5bMR4rIAtlxHL3eeL',
      url: 'https://www.youtube.com/embed/jfKfPfyJRdk'
    },
  ];

  it("should show loading state", () => {
    render(<MovieList isLoading={true} />);

    const loadingElement = screen.getByRole('progressbar');

    expect(loadingElement).toBeInTheDocument();
  });

  it("should render list of movies correctly", () => {
    render(<MovieList list={movies} isLoading={false} />);

    const listElement = screen.getByRole('list');
    const { getAllByRole } = within(listElement);
    const items = getAllByRole("listitem");

    /**
     * Make sure the list is rendered with the right length
     */
    expect(listElement).toBeInTheDocument();
    expect(items.length).toBe(movies.length);
  });
});
