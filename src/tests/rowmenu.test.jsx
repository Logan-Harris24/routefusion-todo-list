import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import { RowMenu } from "../components/DataTable/RowMenu/rowmenu";

describe('RowMenu', () => {
  const mockNote = {
    "id": "46b49eee-7202-433d-a020-b6dc9a25d833",
    "description": "Ad tempor irure deserunt ea eu laboris cupidatat reprehenderit pariatur.",
    "isCompleted": false,
    "createdDate": "2022-03-19T07:09:15"
  };
  
  it('displays complete menu option', async () => {
    render(<RowMenu note={mockNote}/>);
    await waitFor(() => {
      expect(screen.getByTestId("rowMenuComplete")).toBeInTheDocument();
    });
  });

  it('displays delete menu option', async () => {
    render(<RowMenu note={mockNote}/>);
    await waitFor(() => {
      expect(screen.getByTestId("rowMenuDelete")).toBeInTheDocument();
    });
  });
});