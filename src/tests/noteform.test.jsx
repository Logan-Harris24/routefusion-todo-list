import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import { NoteForm } from "../components/NoteForm/noteform";

describe('NoteForm', () => {
  it('displays note form header', async () => {
    render(<NoteForm/>);
    expect(screen.getByText("What's on your to-do list?")).toBeInTheDocument();
  });
  
  it('displays note form input', async () => {
    render(<NoteForm/>);
    expect(screen.getByTestId("noteFormInput")).toBeInTheDocument();
  });

  it('displays note form counter when typing', async () => {
    render(<NoteForm/>);
    fireEvent.focus(screen.getByTestId("noteFormInput"));
    await waitFor(() => {
      expect(screen.getByTestId("noteFormCounter")).toBeInTheDocument();
    });
  });
});