import { Button, CircularProgress } from '@material-ui/core';
import {
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@material-ui/icons';

export const CancelButton = (props) => {
  const { loading } = props;
  return (
    <Button disabled={loading} variant="contained" startIcon={<CancelIcon />} {...props}>
      Cancel
    </Button>
  );
};

export const DeleteButton = (props) => {
  const { loading } = props;
  return (
    <Button disabled={loading} color="secondary" variant="contained" startIcon={<DeleteIcon />} {...props}>
      {loading ? <CircularProgress size={25} color="inherit" /> : 'Delete'}
    </Button>
  );
};

export const EditButton = (props) => {
  const { loading } = props;
  return (
    <Button disabled={loading} variant="contained" startIcon={<EditIcon />} {...props}>
      Edit
    </Button>
  );
};

export const SaveButton = (props) => {
  const { loading } = props;
  return (
    <Button disabled={loading} color="primary" variant="contained" startIcon={<SaveIcon />} {...props}>
      {loading ? <CircularProgress size={25} color="inherit" /> : 'Save'}
    </Button>
  );
};
