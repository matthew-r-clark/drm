import router from '@@router';
import supabase from '@@supabase';
import { head, isEmpty, omit } from 'ramda';

const api = {
  /* GET connection by ID
  sample response:
  {
    "id": "00331a27-1b5c-4f13-aa63-3705e59b543c",
    "status": "pledged - need to submit",
    "last_contacted": "2021-05-20",
    "is_thank_you_card_sent": false,
    "is_pledge_submitted": true,
    "is_pledge_confirmed": true,
    "minister_id": "cc4138b1-9d10-4d21-9c12-a77eecf34bf4",
    "partner_id": "62a21a72-edb3-4f80-9b21-595d4a72a645",
    "notes": {},
    "pledge_amount_cents": null,
    "is_pledge_recurring": false,
    "nickname": null
  }
  */
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
      res.status(200).json(head(data));
    }
  },

  /* PUT (update) connection by ID
  all updatable fields:
  - is_pledge_confirmed: boolean
  - nickname: string
  - status: string
  - last_contacted: date
  - pledge_amount_cents: integer
  - is_pledge_recurring: boolean
  - is_thank_you_card_sent: boolean
  - is_pledge_submitted: boolean
  - is_pledge_confirmed: boolean
  - notes: json object

  sample body:
  {
    "is_pledge_confirmed": true
  }
  * to insure you are updating the correct record, include the id in the body

  sample response:
  {
    "id": "00331a27-1b5c-4f13-aa63-3705e59b543c",
    "status": "pledged - need to submit",
    "last_contacted": "2021-05-20",
    "is_thank_you_card_sent": false,
    "is_pledge_submitted": true,
    "is_pledge_confirmed": true,
    "minister_id": "cc4138b1-9d10-4d21-9c12-a77eecf34bf4",
    "partner_id": "62a21a72-edb3-4f80-9b21-595d4a72a645",
    "notes": {},
    "pledge_amount_cents": null,
    "is_pledge_recurring": false,
    "nickname": null
  }

  Notes field format:
  {
    "minister": [
      "Aliquam erat volutpat",
      "Etiam pretium iaculis justo"
    ],
    "admin": [
      "In congue",
      "In hac habitasse platea dictumst"
    ]
  }
  */
  put: async (req, res) => {
    const { query: { connectionId }, body } = req;
    if (Array.isArray(body)) {
      res.status(400).send('Updating multiple connection records is not allowed.');
      return;
    }
    if (body.id && body.id !== connectionId) {
      res.status(400).send('ID from body does not match ID route parameter.');
      return;
    }
    const payload = omit(['id'], body);

    const { data, error } = await supabase
      .from('ministers_partners')
      .update(payload)
      .match({ id: connectionId });
    if (data && isEmpty(data)) {
      res.status(404).send(`Connection with ID ${connectionId} not found.`);
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
