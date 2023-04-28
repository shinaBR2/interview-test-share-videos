import { render, screen } from "@testing-library/react";
import MovieItem from "./MovieItem";

describe("Movie listing item", () => {
  const mockVideo = {
    id: '-NU5Sm9kkA4nJnPI1E-U',
    url: 'https://www.youtube.com/embed/BoWPSgz4Hx8'
  };

  it("should render correctly", () => {
    render(<MovieItem video={mockVideo} />);

    const iframe = screen.getByTitle("embed");

    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toBe(mockVideo.url)
  });
});