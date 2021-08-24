import router from '@@router';
import supabase from '@@supabase';
import { isEmpty } from 'ramda';
import Logger from '@@logger';

const logger = Logger();

const api = {
  get: async (req, res) => {
    logger.info('hit the route: api/connections/pledges/[ministerId]');
    console.log({ logger });
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
