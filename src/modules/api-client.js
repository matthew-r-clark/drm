import getConfig from 'next/config';
import useSWR from 'swr';
import { evolve, includes } from 'ramda';

const { publicRuntimeConfig } = getConfig();

const request = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      Authorization: publicRuntimeConfig.apiAuthKey,
      'content-type': 'application/json',
      ...options.headers,
    },
    ...evolve({ body: JSON.stringify }, options),
  });

  const contentType = response.headers.get('content-type');

  let payload;
  if (contentType && includes('application/json', contentType)) {
    payload = await response.json();
  } else {
    payload = await response.text();
  }

  if (!response.ok) {
    throw payload;
  }

  return payload;
};

export default {
  get: (url) => {
    const { data, error } = useSWR(url, request);

    return {
      data,
      isLoading: !error && !data,
      error,
    };
  },

  post: (url, body) => request(url, { method: 'post', body }),

  put: (url, body) => request(url, { method: 'put', body }),

  delete: (url) => request(url, { method: 'delete' }),
};
