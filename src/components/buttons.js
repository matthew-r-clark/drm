import { Button } from '@material-ui/core';
import {
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@material-ui/icons';

export const CancelButton = (props) => (
  <Button variant="contained" startIcon={<CancelIcon />} {...props}>
    Cancel
  </Button>
);

export const DeleteButton = (props) => (
  <Button color="secondary" variant="contained" startIcon={<DeleteIcon />} {...props}>
    Delete
  </Button>
);

export const EditButton = (props) => (
  <Button variant="contained" startIcon={<EditIcon />} {...props}>
    Edit
  </Button>
);

export const SaveButton = (props) => (
  <Button color="primary" variant="contained" startIcon={<SaveIcon />} {...props}>
    Save
  </Button>
);
