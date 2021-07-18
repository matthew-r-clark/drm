import router from '@@router';
import supabase from '@@supabase';
import { head } from 'ramda';

const api = {
  get: async (req, res) => {
    const { id } = req.query;
    const { data, error } = await supabase
      .from('ministers')
      .select()
      .filter('id', 'eq', id);
    if (data) {
      res.status(200).json(head(data));
    } else {
      res.status(400).send(error);
    }
  },

  put: async (req, res) => {
    const { id } = req.query;
    const { data, error } = await supabase
      .from('ministers')
      .update(req.body)
      .match({ id });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    const { id } = req.query;
    const { data, error } = await supabase
      .from('ministers')
      .delete(req.body)
      .match({ id });
    if (data) {
      res.status(200).end();
    } else {
      res.status(400).send(error);
    }
  },
};

export default router(api);
