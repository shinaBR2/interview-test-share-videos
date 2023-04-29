import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { AuthContext } from './contexts/auth';
import App from './App';

jest.mock('firebase/database', () => {
  return {
    set: ref => { },
    push: ref => { },
    ref: (db, path) => {
      if (path === 'movies') {
        return 'movies';
      }

      return '';
    },
    getDatabase: () => { },
    onValue: (ref, callback) => {
      const moviesSnapshot = [
        {
          key: '-NU5Sm9kkA4nJnPI1E-U',
          val: () => ({ url: 'https://www.youtube.com/embed/BoWPSgz4Hx8' })
        },
        {
          key: '-NU5UDRSvzLptGwKns13',
          val: () => ({ url: 'https://www.youtube.com/embed/9jbi7XdFV5o' })
        },
        {
          key: '-NU5bMR4rIAtlxHL3eeL',
          val: () => ({ url: 'https://www.youtube.com/embed/jfKfPfyJRdk' })
        },
      ];

      let snapshot;
      if (ref === 'movies') {
        snapshot = moviesSnapshot;
      }

      callback(snapshot);
      return function unsubscribe() { };
    }
  }
});

describe("Integration test", () => {
  const contextValue = {
    isSignedIn: false
  };
  const signedInContextValue = {
    isSignedIn: true,
    isLoading: false,
  }

  it("Click on the register button should show dialog", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <App />
      </AuthContext.Provider>
    );

    const element = screen.getByRole("button", {
      name: /Sign in/i
    });

    expect(element).toBeInTheDocument();

    userEvent.click(element);
    const dialogElement = screen.getByRole("dialog", {
      name: /Sign in/i
    });
    expect(dialogElement).toBeInTheDocument();
  });

  it("click on the share button should show dialog", async () => {
    render(
      <AuthContext.Provider value={signedInContextValue}>
        <App />
      </AuthContext.Provider>
    );

    const shareButtonElement = screen.getByRole("button", {
      name: /Share video/i
    });

    expect(shareButtonElement).toBeInTheDocument();

    userEvent.click(shareButtonElement);
    const dialogElement = screen.getByRole("dialog", {
      name: /Share a movie/i
    });
    expect(dialogElement).toBeInTheDocument();
  })

  it("Should render movies from database", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <App />
      </AuthContext.Provider>
    );

    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
  });


});