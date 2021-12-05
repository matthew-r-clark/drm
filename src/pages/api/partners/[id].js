import router from 'modules/router';
import supabase from 'modules/supabase';
import { head, isEmpty, pick } from 'ramda';

const api = {
  /* GET partner by ID
  sample response:
  {
    "id": "0105eaf9-9d14-4460-9894-c1f1a7a34222",
    "address_line_1": "647 Canary Drive",
    "address_line_2": "Ste. # 355",
    "city": "Chicago",
    "state": "IL",
    "zip_code": "60697",
    "email": "jsibbee@joomla.org",
    "phone": "312-523-3817",
    "birthday": "02/12",
    "is_married": true,
    "preferred_contact_method": "phone",
    "spouse_id": "004f1d62-6d55-443f-b3e7-480c00ed60f9",
    "aliases": [
      "Raviv Sibbe"
    ]
  }
  */
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

  /* PUT (update) partner by ID
  sample body:
  {
    "birthday": "03/25"
  }
  * all other allowed fields are included in response
  * to insure you are updating the correct record, include the id in the body

  sample response:
  {
    "id": "8878fc91-1cdd-4c05-9490-24c7f60aa313",
    "address_line_1": null,
    "address_line_2": null,
    "city": null,
    "state": null,
    "zip_code": null,
    "email": null,
    "phone": null,
    "birthday": "03/25",
    "is_married": false,
    "preferred_contact_method": null,
    "spouse_id": null,
    "aliases": [
      "Matthew Clark"
    ]
  }
  */
  put: async (req, res) => {
    const { query: { id }, body } = req;
    if (Array.isArray(body)) {
      res.status(400).send('Updating multiple partner records is not allowed.');
      return;
    }
    if (body.id && body.id !== id) {
      res.status(400).send('ID from body does not match ID route parameter.');
      return;
    }
    const payload = pick(
      [
        'aliases',
        'address_line_1',
        'address_line_2',
        'city',
        'state',
        'zip_code',
        'email',
        'phone',
        'birthday',
        'is_married',
        'preferred_contact_method',
        'spouse_id',
      ],
      body,
    );

    const { data, error } = await supabase
      .from('partners')
      .update(payload)
      .match({ id });
    if (data && isEmpty(data)) {
      res.status(404).send(`Partner with ID ${id} not found.`);
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
