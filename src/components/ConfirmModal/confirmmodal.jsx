import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { create } from 'zustand';

const useConfirmModalStore = create((set) => ({
  message: '',
  onSubmit: undefined,
  close: () => set({ onSubmit: undefined }),
}));

export const modal = (message, onSubmit) => {
  useConfirmModalStore.setState({
    message,
    onSubmit,
  });
};

export function ConfirmModal() {
  const { message, onSubmit, close } = useConfirmModalStore();

  return (
    <Dialog open={Boolean(onSubmit)} onClose={close} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm Operation</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={close}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: 'black', '&:hover': { backgroundColor: '#eeeeee9c' } }} onClick={close}>
          Cancel
        </Button>
        <Button sx={{ background: '#1E90FF', color: 'white', '&:hover': { backgroundColor: '#0a78e6' } }}
          onClick={() => {
            if (onSubmit) {
              onSubmit();
            }
            close();
          }}
        >
            Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
