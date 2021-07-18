import router from '@@router';
import supabase from '@@supabase';
import { isEmpty } from 'ramda';

const api = {
  get: async (req, res) => {
    const { data, error } = await supabase
      .from('ministers')
      .select()
      .match(req.query);
    if (data && isEmpty(data)) {
      res.status(404).send(`No ministers found matching query:\n${JSON.stringify(req.query)}`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(data);
    }
  },

  post: async (req, res) => {
    const { data, error } = await supabase
      .from('ministers')
      .insert(req.body);
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(201).json(data);
    }
  },
};

export default router(api);
