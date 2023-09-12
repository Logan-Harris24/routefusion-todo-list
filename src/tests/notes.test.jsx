import { render, screen, waitFor} from '@testing-library/react';
import { Notes } from "../components/Notes/notes";

describe('Notes', () => {
  it('displays notes header', async () => {
    const mockNotes = [
      {
        "id": "46b49eee-7202-433d-a020-b6dc9a25d833",
        "description": "Ad tempor irure deserunt ea eu laboris cupidatat reprehenderit pariatur.",
        "isCompleted": false,
        "createdDate": "2022-03-19T07:09:15"
      },
      {
        "id": "a71beb44-24dc-4655-9634-5372bd28dac6",
        "description": "Pariatur id anim cupidatat irure.",
        "isCompleted": false,
        "createdDate": "2023-05-13T10:03:16"
      },
      {
        "id": "46b49eee-7202-433d-a020-b6dc9a25d834",
        "description": "Aanim cupidatat irure laboris cupidatat reprehenderit pariatur.",
        "isCompleted": false,
        "createdDate": "2022-08-19T07:09:15"
      },
    ];

    render(<Notes notes={mockNotes}/>);
    await waitFor(() => {
      expect(screen.getByTestId("notesHeader")).toBeInTheDocument();
    });
  });
});