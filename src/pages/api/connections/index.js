import router from '@@router';
import supabase from '@@supabase';

const api = {
  /* POST (create) new minister-partner connections
  sample body:
  [
    {
      "minister_id": "cc4138b1-9d10-4d21-9c12-a77eecf34bf4",
      "partner_id": "62a21a72-edb3-4f80-9b21-595d4a72a645"
    },
    ...
  ]
  * minister_id and partner_id are the only required fields
  * other fields default to false or null, see response for all possible fields
  * if only adding a single connection, can send object without enclosing array
    response is always an array

  sample response:
  [
    {
      "id": "6af51e73-64d2-43ff-b469-8981143bd8cb",
      "status": null,
      "last_contacted": null,
      "is_thank_you_card_sent": false,
      "is_pledge_submitted": false,
      "is_pledge_confirmed": false,
      "minister_id": "cc4138b1-9d10-4d21-9c12-a77eecf34bf4",
      "partner_id": "62a21a72-edb3-4f80-9b21-595d4a72a645",
      "notes": {},
      "pledge_amount_cents": null,
      "is_pledge_recurring": false,
      "nickname": null
    },
    ...
  ]

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
  post: async (req, res) => {
    const { data, error } = await supabase
      .from('ministers_partners')
      .insert(req.body);
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(201).json(data);
    }
  },
};

export default router(api);
