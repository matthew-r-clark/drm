import React from 'react';
import styled from '@emotion/styled';
import { getMinisters } from '@@ministers';

const H1 = styled.h1`
  text-align: center;
`;

const Ministers = () => {
  const { data, isLoading, isError } = getMinisters();

  if (isError) return <div>Failed to load.</div>;
  if (isLoading) return <div>Loading...</div>;
  return <ul>{data.data.map((min) => <li key={min.id}>{`${min.first_name} ${min.last_name[0]}`}</li>)}</ul>;
};

export default function Index() {
  return (
    <div>
      <H1>Ministers</H1>
      <Ministers />
    </div>
  );
}
