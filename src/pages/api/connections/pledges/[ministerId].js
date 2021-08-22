import router from '@@router';
import supabase from '@@supabase';
import { isEmpty, path } from 'ramda';
import getConfig from 'next/config';
import { Logtail } from '@logtail/node';

const { serverRuntimeConfig } = getConfig();
const logtailSourceToken = path(['logtail', 'sourceToken'], serverRuntimeConfig);

const logtail = new Logtail(logtailSourceToken);

const api = {
  get: async (req, res) => {
    logtail.info('hit the route: api/connections/pledges/[ministerId]');
    const { ministerId } = req.query;
    const { data, error } = await supabase
      .from('pledges')
      .select()
      .match({ minister_id: ministerId });
    if (data && isEmpty(data)) {
      res.status(404).send(`No pledges found for minister with ID ${ministerId}.`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(data);
    }
  },
};

export default router(api);
