import client from 'modules/api-client';

export function getProspects(ministerId) {
  return client.get(`/api/connections/prospects/${ministerId}`);
}

export function getPledges(ministerId) {
  return client.get(`/api/connections/pledges/${ministerId}`);
}

export function getPartners() {
  return client.get('/api/partners');
}

export function createPartner(partner) {
  return client.post('/api/partners', partner);
}

export function getPartnerById(id) {
  return client.get(`/api/partners/${id}`);
}

export function updatePartnerById(id, partner) {
  return client.put(`/api/partners/${id}`, partner);
}

export function deletePartnerById(id) {
  return client.delete(`/api/partners/${id}`);
}
