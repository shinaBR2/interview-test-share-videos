import { render, screen } from "@testing-library/react";
import ActionButtons from './ActionButtons';
import { AuthContext } from '../../contexts/auth';

describe("Header buttons for anonymous visitors", () => {
  const contextValue = {
    isSignedIn: false
  };

  it("should render register button", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <ActionButtons />
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

describe("Header buttons for signed in users", () => {
  const contextValue = {
    isSignedIn: true,
    user: {
      email: 'test@gmail.com'
    }
  };

  it("should render share movie button", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <ActionButtons />
      </AuthContext.Provider>
    );

    const element = screen.getByRole("button", {
      name: /Share video/i
    });

    expect(element).toBeInTheDocument();
  });
  it("should render sign out button", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <ActionButtons />
      </AuthContext.Provider>
    );

    const element = screen.getByRole("button", {
      name: /Sign out/i
    });

    expect(element).toBeInTheDocument();
  });
  it("should show share video dialog upon clicking on the share button", () => { });
});
