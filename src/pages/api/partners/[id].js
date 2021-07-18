import router from '@@router';
import supabase from '@@supabase';
import { head, isEmpty } from 'ramda';

const api = {
  get: async (req, res) => {
    const { id } = req.query;
    const { data, error } = await supabase
      .from('partners')
      .select()
      .match({ id });
    if (data && isEmpty(data)) {
      res.status(404).send(`Partner with ID ${id} not found.`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(head(data));
    }
  },

  put: async (req, res) => {
    const { id } = req.query;
    const { data, error } = await supabase
      .from('partners')
      .update(req.body)
      .match({ id });
    if (data && isEmpty(data)) {
      res.status(404).send(`Partner with ID ${id} not found.`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(data);
    }
  },

  delete: async (req, res) => {
    const { id } = req.query;
    const { data, error } = await supabase
      .from('partners')
      .delete()
      .match({ id });
    if (data && isEmpty(data)) {
      res.status(404).send(`Partner with ID ${id} not found.`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).end();
    }
  },
};

export default router(api);
