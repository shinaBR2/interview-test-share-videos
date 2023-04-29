import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import AuthDialog from './AuthDialog';

const mockSubmit = jest.fn((action, data) => null);
const mockHandleClose = jest.fn(() => null);

const mockFailedSubmit = jest.fn(() => {
  return Promise.resolve({
    data: {},
    error: {
      message: 'Something went wrong from the server'
    }
  });
});

describe("Auth dialog", () => {
  it("should render dialog", () => {
    render(<AuthDialog open={true} />);

    const element = screen.getByRole("dialog", {
      name: /Sign in/i
    });
    expect(element).toBeInTheDocument();


    /**
     * Test tabs
     */
    const tabElements = screen.getAllByRole('tab');
    expect(tabElements.length).toBe(2);

    /**
     * Checking form
     */
    const usernameInputElement = screen.getByRole('textbox', {
      name: /Username/i
    });
    expect(usernameInputElement).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();
  });

  it("Should display required error", async () => {
    render(<AuthDialog open={true} onSubmit={mockSubmit} />);

    userEvent.click(screen.getByRole("button", {
      name: /Register/i,
    }));

    await waitFor(() => {
      const usernameErrorTextElement = screen.getByText("username is a required field");
      expect(usernameErrorTextElement).toBeInTheDocument();
    })
    await waitFor(() => {
      const passwordErrorTextElement = screen.getByText("password is a required field");
      expect(passwordErrorTextElement).toBeInTheDocument();
    })

    expect(mockSubmit).not.toBeCalled();
  });

  it("Should submit form", async () => {
    render(<AuthDialog open={true} onSubmit={mockFailedSubmit} handleClose={mockHandleClose} />);

    userEvent.type(screen.getByRole("textbox", {
      name: /username/i,
    }), "testUsername")
    userEvent.type(screen.getByLabelText(/password/i), 'testPassword');

    userEvent.click(screen.getByRole("button", {
      name: /Register/i,
    }));

    await waitFor(() => {
      expect(mockFailedSubmit).toBeCalledWith('register', {
        username: 'testUsername',
        password: 'testPassword'
      });
    });
  });
});