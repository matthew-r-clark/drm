import router from '@@router';
import supabase from '@@supabase';
import { isEmpty } from 'ramda';

const api = {
  get: async (req, res) => {
    const { connectionId } = req.query;
    const { data, error } = await supabase
      .from('ministers_partners')
      .select()
      .match({ id: connectionId });
    if (data && isEmpty(data)) {
      res.status(404).send(`Connection with ID ${connectionId} not found.`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(data);
    }
  },

  put: async (req, res) => {
    const { connectionId } = req.query;
    const { data, error } = await supabase
      .from('ministers_partners')
      .update(req.body)
      .match({ id: connectionId });
    if (data && isEmpty(data)) {
      res.status(404).send(`Connection with ID ${connectionId} not found.`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(data);
    }
  },

  delete: async (req, res) => {
    const { connectionId } = req.query;
    const { data, error } = await supabase
      .from('ministers_partners')
      .delete()
      .match({ id: connectionId });
    if (data && isEmpty(data)) {
      res.status(404).send(`Connection with ID ${connectionId} not found.`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).end();
    }
  },
};

export default router(api);
