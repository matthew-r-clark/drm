import client from 'modules/api-client';

export function getMinisters(query) {
  const searchParams = new URLSearchParams(query);
  const queryString = `?${searchParams.toString()}`;
  return client.get(`/api/ministers${query && queryString}`);
}

export function createMinister(minister) {
  return client.post('/api/ministers', minister);
}

export function getMinisterById(id) {
  return client.get(`/api/ministers/${id}`);
}

export function updateMinisterById(id, minister) {
  return client.put(`/api/ministers/${id}`, minister);
}

export function deleteMinisterById(id) {
  return client.delete(`/api/ministers/${id}`);
}
