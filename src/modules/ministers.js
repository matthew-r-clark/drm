import client from 'modules/api-client';

export function getMinisters() {
  return client.get('/api/ministers');
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
