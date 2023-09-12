import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import { Note } from "../components/Note/note";

describe('Note', () => {
  const mockNote = {
    "id": "46b49eee-7202-433d-a020-b6dc9a25d833",
    "description": "Ad tempor irure deserunt ea eu laboris cupidatat reprehenderit pariatur.",
    "isCompleted": false,
    "createdDate": "2022-03-19T07:09:15"
  };

  it('displays description', async () => {
    render(<Note note={mockNote}/>);
    await waitFor(() => {
      expect(screen.getByTestId("noteDescription")).toBeInTheDocument();
    });
  });

  it('hides description input', async () => {
    render(<Note note={mockNote}/>);
    await waitFor(() => {
      expect(screen.queryByTestId("noteInput")).not.toBeInTheDocument();
    });
  });

  it('displays description input when clicked', async () => {
    render(<Note note={mockNote}/>);
    
    fireEvent.click(screen.getByTestId("noteDescription"));

    await waitFor(() => {
      expect(screen.queryByTestId("noteInput")).toBeInTheDocument();
    });
  });
});