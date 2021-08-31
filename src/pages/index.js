import React, { useState } from 'react';
import styled from '@emotion/styled';
import { getMinisters, getMinisterById } from '@@ministers';
import { getPartners } from '@@partners';
import { prop } from 'ramda';
import { Formik, Field, Form } from 'formik';

const H1 = styled.h1`
  text-align: center;
  padding: 0;
  margin-top: 40px;
  margin-bottom: 5px;
`;

const Pagination = ({ page, setPage, totalPages }) => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
    <button
      type="button"
      onClick={() => setPage(page - 1)}
      disabled={page <= 1}
    >
      &#60;
    </button>
    <span style={{ padding: '0 10px' }}>
      Page {page}
    </span>
    <button
      type="button"
      onClick={() => setPage(page + 1)}
      disabled={page >= totalPages}
    >
      &#62;
    </button>
  </div>
);

const Ministers = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const { data, isLoading, isError } = getMinisters({ page });

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
        height: 330,
      }}
    >
      {isLoading
        ? <div>...Loading</div>
        : <ul>{data.data.map((m) => <li key={m.id}>{`${m.first_name} ${m.last_name[0]}`}</li>)}</ul>}
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
        height: 330,
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
  const { data, isLoading, isError } = getMinisterById(id);

  if (isError) return <div>Failed to load.</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <p>
      {`${data.first_name} ${data.last_name}`}
    </p>
  );
};

export default function Index() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <H1>Ministers</H1>
      <Ministers />

      <H1>Partners</H1>
      <Partners />

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

      <H1>Update Minister By ID</H1>
      
    </div>
  );
}
