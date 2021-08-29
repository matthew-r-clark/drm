import router from '@@router';
import supabase from '@@supabase';
import { head, isEmpty, omit, path, pick } from 'ramda';

const api = {
  /* GET minister by ID
  sample response:
  {
    "id": "fd0bad71-d0e6-4b7a-ae45-93ccab7854f5",
    "first_name": "Jon",
    "last_name": "Smith",
    "email": "jons@anyfocus.org",
    "is_admin": false,
    "is_apprentice": true,
    "fundraising_goal_dollars": 4000,
    "coach_id": null
  }
  */
  get: async (req, res) => {
    const { id } = req.query;
    const { data, error } = await supabase
      .from('ministers')
      .select()
      .match({ id });
    if (data && isEmpty(data)) {
      res.status(404).send(`Minister with ID ${id} not found.`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(head(data));
    }
  },

  /* PUT (update) minister by ID
  sample body:
  {
    "is_apprentice": true,
    "fundraising_goal_dollars": 4000
  }
  * to insure you are updating the correct record, include the id in the body

  sample response:
  {
    "id": "fd0bad71-d0e6-4b7a-ae45-93ccab7854f5",
    "first_name": "Jon",
    "last_name": "Smith",
    "email": "jons@anyfocus.org",
    "is_admin": false,
    "is_apprentice": true,
    "fundraising_goal_dollars": 4000,
    "coach_id": null
  }
  */
  put: async (req, res) => {
    const { query: { id }, body } = req;
    if (Array.isArray(body)) {
      res.status(400).send('Updating multiple minister records is not allowed.');
      return;
    }
    if (body.id && body.id !== id) {
      res.status(400).send('ID from body does not match ID route parameter.');
      return;
    }
    const payload = omit(['id'], body);

    const { data, error } = await supabase
      .from('ministers')
      .update(payload)
      .match({ id });
    if (data && isEmpty(data)) {
      res.status(404).send(`Minister with ID ${id} not found.`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(head(data));
    }
  },

  /* DELETE connection by ID
  successful response is an empty 200 OK
  */
  delete: async (req, res) => {
    const { id } = req.query;
    const { data, error } = await supabase
      .from('ministers')
      .delete()
      .match({ id });
    if (data && isEmpty(data)) {
      res.status(404).send(`Minister with ID ${id} not found.`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).end();
    }
  },
};

export default router(api);
