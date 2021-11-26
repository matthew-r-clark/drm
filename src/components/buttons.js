import { Button, CircularProgress } from '@material-ui/core';
import {
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@material-ui/icons';

export const CancelButton = ({ loading, ...props }) => (
  <Button disabled={loading} variant="contained" startIcon={<CancelIcon />} {...props}>
    {loading ? <CircularProgress size={25} color="inherit" /> : 'Cancel'}
  </Button>
);

export const DeleteButton = ({ loading, ...props }) => (
  <Button disabled={loading} color="secondary" variant="contained" startIcon={<DeleteIcon />} {...props}>
    {loading ? <CircularProgress size={25} color="inherit" /> : 'Delete'}
  </Button>
);

export const EditButton = ({ loading, ...props }) => (
  <Button disabled={loading} variant="contained" startIcon={<EditIcon />} {...props}>
    {loading ? <CircularProgress size={25} color="inherit" /> : 'Edit'}
  </Button>
);

export const SaveButton = ({ loading, ...props }) => (
  <Button disabled={loading} color="primary" variant="contained" startIcon={<SaveIcon />} {...props}>
    {loading ? <CircularProgress size={25} color="inherit" /> : 'Save'}
  </Button>
);
