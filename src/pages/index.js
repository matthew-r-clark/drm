import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {
  getMinisters,
  getMinisterById,
  updateMinisterById,
  createMinister,
  deleteMinisterById,
} from 'modules/ministers';
import { getPartners } from 'modules/partners';
import {
  forEach,
  head,
  pipe,
  prop,
} from 'ramda';
import { Formik, Field, Form } from 'formik';

const H1 = styled.h1`
  text-align: center;
  padding: 0;
  margin-top: 40px;
  margin-bottom: 5px;
`;

const Container = styled.div`
  padding: 20px;
  width: 100%;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const Pagination = ({ page, setPage, totalPages }) => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
    <Button
      variant="contained"
      onClick={() => setPage(page - 1)}
      disabled={page <= 1}
    >
      &#60;
    </Button>
    <span style={{ padding: '0 10px' }}>
      Page {page}
    </span>
    <Button
      variant="contained"
      onClick={() => setPage(page + 1)}
      disabled={page >= totalPages}
    >
      &#62;
    </Button>
  </div>
);

const Ministers = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const { data, isLoading, error } = getMinisters({ page });

  if (error) return <div>Failed to load.</div>;
  if (!isLoading && !totalPages) {
    setTotalPages(prop('pages', data));
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 350,
      }}
    >
      {isLoading
        ? <div>...Loading</div>
        : <ul>{data.data.map((m) => <li key={m.id}>{`${m.first_name} ${m.last_name}`}</li>)}</ul>}
      <Pagination {...{ page, setPage, totalPages }} />
    </div>
  );
};

const Partners = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const { data, isLoading, isError } = getPartners({ page });

  if (isError) return <div>Failed to load.</div>;
  if (!isLoading && !totalPages) {
    setTotalPages(prop('pages', data));
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 350,
      }}
    >
      {isLoading
        ? <div>...Loading</div>
        : <ul>{data.data.map((p) => <li key={p.id}>{`${p.nickname || p.aliases[0]}`}</li>)}</ul>}
      <Pagination {...{ page, setPage, totalPages }} />
    </div>
  );
};

const Minister = ({ id }) => {
  const { data, isLoading, error } = getMinisterById(id);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>Loading...</div>;
  return data ? (
    <p>
      {JSON.stringify(data, null, 4)}
    </p>
  ) : null;
};

export default function Index() {
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [updateFailure, setUpdateFailure] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(null);
  const [createFailure, setCreateFailure] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);
  const [deleteFailure, setDeleteFailure] = useState(null);

  const handleClose = () => {
    forEach((func) => func(null), [
      setUpdateSuccess,
      setUpdateFailure,
      setCreateSuccess,
      setCreateFailure,
      setDeleteSuccess,
      setDeleteFailure,
    ]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Container>
        <H1>Ministers</H1>
        <Ministers />
      </Container>

      {/* <Container>
        <H1>Partners</H1>
        <Partners />
      </Container> */}

      <Container>
        <H1>Get Minister By ID</H1>
        <Formik
          initialValues={{ id: '19caa982-a77f-410c-a15b-e295bafdd0ca' }}
        >
          {({ values }) => (
            <Form>
              <Field
                type="text"
                name="id"
                placeholder="Enter a minister's ID to search"
                style={{
                  width: 300,
                }}
              />
              <Minister id={values.id} />
            </Form>
          )}
        </Formik>
      </Container>

      <Container>
        <H1>Update Minister By ID</H1>
        <Formik
          initialValues={{
            id: '',
            first_name: '',
            last_name: '',
          }}
          onSubmit={(values) => {
            const { id } = values;
            updateMinisterById(id, values)
              .then(setUpdateSuccess)
              .catch(setUpdateFailure);
          }}
        >
          {() => (
            <Form>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p>Minister ID</p>
                <Field
                  type="text"
                  name="id"
                />
                <p>First Name:</p>
                <Field
                  type="text"
                  name="first_name"
                />
                <p>Last Name:</p>
                <Field
                  type="text"
                  name="last_name"
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>Update</Button>
                {updateSuccess && (
                  <Snackbar open={!!updateSuccess} autoHideDuration={10000} onClose={handleClose}>
                    <Alert severity="success">Minister has successfully been updated.</Alert>
                  </Snackbar>
                )}
                {updateFailure && (
                  <Snackbar open={!!updateFailure} autoHideDuration={10000} onClose={handleClose}>
                    <Alert severity="error">{updateFailure.message}</Alert>
                  </Snackbar>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Container>

      <Container>
        <H1>Create Minister</H1>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            email: '',
          }}
          onSubmit={(values) => {
            createMinister(values)
              .then(setCreateSuccess)
              .catch(setCreateFailure);
          }}
        >
          {() => (
            <Form>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p>First Name:</p>
                <Field
                  type="text"
                  name="first_name"
                />
                <p>Last Name:</p>
                <Field
                  type="text"
                  name="last_name"
                />
                <p>Email:</p>
                <Field
                  type="text"
                  name="email"
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>Create</Button>
                {createSuccess && (
                  <Snackbar open={!!createSuccess} autoHideDuration={10000} onClose={handleClose}>
                    <Alert severity="success">Minister with id {pipe(head, prop('id'))(createSuccess)} has successfully been created.</Alert>
                  </Snackbar>
                )}
                {createFailure && (
                  <Snackbar open={!!createFailure} autoHideDuration={10000} onClose={handleClose}>
                    <Alert severity="error">{createFailure.message}</Alert>
                  </Snackbar>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Container>

      <Container>
        <H1>Delete Minister</H1>
        <Formik
          initialValues={{
            id: '',
          }}
          onSubmit={({ id }) => {
            deleteMinisterById(id)
              .then(() => setDeleteSuccess(true))
              .catch(setDeleteFailure);
          }}
        >
          {({ values }) => (
            <Form>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p>Minister ID:</p>
                <Field
                  type="text"
                  name="id"
                />
                <Button type="submit" variant="contained" color="secondary" style={{ marginTop: 20 }}>Delete</Button>
                {deleteSuccess && (
                  <Snackbar open={!!deleteSuccess} autoHideDuration={10000} onClose={handleClose}>
                    <Alert severity="success">Minister with id {values.id} has successfully been deleted.</Alert>
                  </Snackbar>
                )}
                {deleteFailure && (
                  <Snackbar open={!!deleteFailure} autoHideDuration={10000} onClose={handleClose}>
                    <Alert severity="error">{JSON.stringify(deleteFailure)}</Alert>
                  </Snackbar>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}
