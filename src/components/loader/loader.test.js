import { render, screen } from "@testing-library/react";
import Loader from './Loader';

describe("Loader", () => {
  it("should render loader correctly", () => {
    render(<Loader />);

    const element = screen.getByRole("progressbar", {
      hidden: true
    });

    expect(element).toBeInTheDocument();
  });
});