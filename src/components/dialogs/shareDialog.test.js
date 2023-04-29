import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import ShareDialog from './ShareDialog';

const mockCloseFunc = jest.fn(() => null);
const mockSubmit = jest.fn(() => {
  return Promise.resolve({
    data: {},
    error: null
  });
});

describe("Share dialog", () => {
  it("should render dialog", () => {
    render(<ShareDialog open={true} />);

    const element = screen.getByRole("dialog", {
      name: /Share a movie/i
    });
    expect(element).toBeInTheDocument();

    /**
     * Checking form
     */
    const usernameInputElement = screen.getByRole('textbox', {
      name: /Movie URL/i
    });
    expect(usernameInputElement).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();
  });

  it("Should display required error", async () => {
    render(<ShareDialog open={true} onSubmit={mockSubmit} />);

    userEvent.click(screen.getByRole("button", {
      name: /Share/i,
    }));

    await waitFor(() => {
      const usernameErrorTextElement = screen.getByText("url is a required field");
      expect(usernameErrorTextElement).toBeInTheDocument();
    })

    expect(mockSubmit).not.toBeCalled();
  });

  it("Should submit form", async () => {
    render(<ShareDialog open={true} onSubmit={mockSubmit} handleClose={mockCloseFunc} />);

    userEvent.type(screen.getByRole("textbox", {
      name: /Movie URL/i,
    }), 'https://www.youtube.com/watch?id=testId');

    userEvent.click(screen.getByRole("button", {
      name: /Share/i,
    }));

    await waitFor(() => {
      expect(mockSubmit).toBeCalledWith('https://www.youtube.com/watch?id=testId');
    });

    expect(mockCloseFunc).toBeCalledTimes(1);
  });
});