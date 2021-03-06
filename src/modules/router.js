import getConfig from 'next/config';
import { curry } from 'ramda';

const { publicRuntimeConfig } = getConfig();

const router = curry((api, req, res) => {
  const { method, url } = req;
  if (req.headers.authorization !== publicRuntimeConfig.apiAuthKey) {
    res.status(401).end();
  } else if (api[method.toLowerCase()]) {
    api[method.toLowerCase()](req, res);
  } else {
    res.status(405).send(`${method} not allowed on ${url}\nDid you forget to send an ID value?`);
  }
});

export default router;
