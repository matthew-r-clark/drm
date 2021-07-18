import router from '@@router';
import supabase from '@@supabase';
import { head, isEmpty } from 'ramda';

const api = {
  get: async (req, res) => {
    const { id } = req.query;
    const { data, error } = await supabase
      .from('partners')
      .select()
      .filter('id', 'eq', id);
    if (data) {
      if (isEmpty(data)) {
        res.status(404).send(`Partner with ID ${id} not found.`);
      }
      res.status(200).json(head(data));
    } else {
      res.status(400).send(error);
    }
  },

  put: async (req, res) => {
    const { id } = req.query;
    const { data, error } = await supabase
      .from('partners')
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
      .from('partners')
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
