import React from 'react';
import styled from '@emotion/styled';
import { getMinisters } from '@@ministers';
import { getPartners } from '@@partners';

const H1 = styled.h1`
  text-align: center;
`;

const Ministers = () => {
  const { data, isLoading, isError } = getMinisters();

  if (isError) return <div>Failed to load.</div>;
  if (isLoading) return <div>Loading...</div>;
  return <ul>{data.data.map((m) => <li key={m.id}>{`${m.first_name} ${m.last_name[0]}`}</li>)}</ul>;
};

const Partners = () => {
  const { data, isLoading, isError } = getPartners();

  if (isError) return <div>Failed to load.</div>;
  if (isLoading) return <div>Loading...</div>;
  return <ul>{data.data.map((p) => <li key={p.id}>{`${p.nickname || p.aliases[0]}`}</li>)}</ul>;
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
