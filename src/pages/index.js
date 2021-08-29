import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getMinisters } from '@@ministers';
import { getPartners } from '@@partners';
import { prop } from 'ramda';

const H1 = styled.h1`
  text-align: center;
`;

const Pagination = ({ page, setPage, totalPages }) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    {page > 1 && <button type="button" onClick={() => setPage(page - 1)}>Previous</button>}
    <span>{page}</span>
    {(!totalPages || page < totalPages) && <button type="button" onClick={() => setPage(page + 1)}>Next</button>}
  </div>
);

const Ministers = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const { data, isLoading, isError } = getMinisters({ page });

  if (isError) return <div>Failed to load.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!totalPages) {
    setTotalPages(prop('pages', data));
  }
  return (
    <>
      <ul>{data.data.map((m) => <li key={m.id}>{`${m.first_name} ${m.last_name[0]}`}</li>)}</ul>
      <Pagination {...{ page, setPage, totalPages }} />
    </>
  );
};

const Partners = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const { data, isLoading, isError } = getPartners({ page });

  if (isError) return <div>Failed to load.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!totalPages) {
    setTotalPages(prop('pages', data));
  }
  return (
    <>
      <ul>{data.data.map((p) => <li key={p.id}>{`${p.nickname || p.aliases[0]}`}</li>)}</ul>
      <Pagination {...{ page, setPage, totalPages }} />
    </>
  );
};

export default function Index() {
  return (
    <div>
      <H1>Ministers</H1>
      <Ministers />
      <H1>Partners</H1>
      <Partners />
    </div>
  );
}
