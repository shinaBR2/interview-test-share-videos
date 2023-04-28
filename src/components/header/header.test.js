import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from './Header';
import { AuthContext } from '../../contexts/auth';

describe("Header in general", () => {
  it("should render header correctly", () => {
    render(<Header />);
    const element = screen.getByRole("banner");
    expect(element).toBeInTheDocument();
  });
});

describe("Header for anonymous visitors", () => {
  const contextValue = {
    isSignedIn: false
  };

  it("should render register button", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <Header />
      </AuthContext.Provider>
    );

    const element = screen.getByRole("button", {
      name: /Sign in/i
    });
    expect(element).toBeInTheDocument();
  });
  it("should render sign in form upon clicking on register button", async () => { });
  it("should show error when no values entered", () => { });
  it("should show message upon success register", () => { });
  it("should show message upon success sign in", () => { });
});

describe("Header for signed in users", () => {
  const contextValue = {
    isSignedIn: true
  };

  it("should render share movie button", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <Header />
      </AuthContext.Provider>
    );

    const element = screen.getByRole("button", {
      name: /Share video/i
    });

    expect(element).toBeInTheDocument();
  });
  it("should render user information correctly", () => { });
  it("should render sign out button", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <Header />
      </AuthContext.Provider>
    );

    const element = screen.getByRole("button", {
      name: /Sign out/i
    });

    expect(element).toBeInTheDocument();
  });
  it("should show share video dialog upon clicking on the share button", () => { });
});
