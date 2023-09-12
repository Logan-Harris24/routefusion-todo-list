import { render, screen } from '@testing-library/react';
import App from "../App";

describe('App', () => {

  it('renders app header', () => {
    render(<App />);
    expect(screen.getByTestId("appHeader")).toBeInTheDocument();
  });

  it('renders note form', () => {
    render(<App />);
    expect(screen.getByTestId("appNoteForm")).toBeInTheDocument();
  });

  it('renders notes table', () => {
    render(<App />);
    expect(screen.getByTestId("appNotes")).toBeInTheDocument();
  });

  it('renders default table state', () => {
    render(<App />);
    const text = screen.getByText("There are no records to display");
    expect(text).toBeInTheDocument();
  });

  it('renders default header', () => {
    render(<App />);
    expect(screen.getByText("To-Do List")).toBeInTheDocument();
  });
});
