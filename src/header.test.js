// import { render, screen } from "@testing-library/react";

describe("Header in general", () => {
  it("should render auth buttons correctly", () => {});
});

describe("Header for anonymous visitors", () => {
  it("should render register button", () => {});
  it("should render sign in form upon clicking on register button", () => {});
  it("should show error when no values entered", () => {});
  it("should show message upon success register", () => {});
  it("should show message upon success sign in", () => {});
});

describe("Header for signed in users", () => {
  it("should render share movie button", () => {});
  it("should render user information correctly", () => {});
  it("should render sign out button", () => {});
  it("should show share video dialog upon clicking on the share button", () => {});
});
