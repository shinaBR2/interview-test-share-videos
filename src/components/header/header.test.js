import { render, screen } from "@testing-library/react";
import Header from './Header';
import { AuthContext } from '../../contexts/auth';

describe("Header in general", () => {
  it("should render header correctly", () => {
    render(<Header />);
    const element = screen.getByRole("banner");
    const heading = screen.getByRole("heading", {
      name: /Funny Movies/i
    })

    expect(element).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});

describe("Header for signed in users", () => {
  const contextValue = {
    isSignedIn: true,
    user: {
      email: 'test@gmail.com'
    }
  };

  it("should render user information correctly", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <Header />
      </AuthContext.Provider>
    );

    const element = screen.getByText(/Welcome test/i);

    expect(element).toBeInTheDocument();
  });
});
