import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import { ConfirmModal } from "../components/ConfirmModal/confirmmodal";

describe('ConfirmModal', () => {
  it('displays main modal', async () => {
    render(<ConfirmModal/>);
    expect(screen.getByTestId("confirmModal")).toBeInTheDocument();
  });
});