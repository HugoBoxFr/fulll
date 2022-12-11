import React, { FormEvent, useState } from "react";
import {
  fireEvent,
  queryByAttribute,
  render,
  screen,
} from "@testing-library/react";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import userEvent from "@testing-library/user-event";

test("renders a header with a title", () => {
  render(<Home />);
  const titleElement = screen.getByText(/github search/i);
  expect(titleElement).toBeInTheDocument();
});

test("should not renders an edit button", () => {
  const getById = queryByAttribute.bind(null, "id");
  const view = render(<Home />);
  const editBtn = getById(view.container, "editbtn");
  expect(editBtn).not.toBeInTheDocument();
});

test("renders an input with hugo in value", async () => {
  render(<Home />);

  const nameInput = screen.getByPlaceholderText<HTMLInputElement>(
    "Who are you looking for ?"
  );

  fireEvent.change(nameInput, { target: { value: "hugo" } });

  expect((nameInput as HTMLInputElement).value).toBe("hugo");
});

test("renders an edit button if input value", async () => {
  const getById = queryByAttribute.bind(null, "id");
  const view = render(<Home />);

  const nameInput = screen.getByPlaceholderText<HTMLInputElement>(
    "Who are you looking for ?"
  );

  fireEvent.change(nameInput, { target: { value: "hugo" } });

  const editBtn = getById(view.container, "editbtn");
  expect(editBtn).toBeInTheDocument();
});
