import router from 'modules/router';
import supabase from 'modules/supabase';
import { isEmpty } from 'ramda';

const api = {
  /* GET pledges for minister by ID
  sample response:
  [
    {
      "id": "5ef4c073-8e4a-4452-ab55-3ef4fb2dd662",
      "aliases": [
          "Krista Adamthwaite"
      ],
      "nickname": null,
      "status": "need to send letter",
      "last_contacted": "2021-01-13",
      "notes": {},
      "is_thank_you_card_sent": false,
      "other_ministers": [
          "Kendre M",
          "Benny O",
          "Matthew C"
      ],
      "pledge_amount_cents": null,
      "is_pledge_recurring": false,
      "address": {
          "line1": "540 Dapin Avenue",
          "line2": "Ste. # 115",
          "city": "Sacramento",
          "state": "CA",
          "zipCode": "95828"
      },
      "email": "madamthwaite3s@devhub.com",
      "phone": "916-692-3920",
      "birthday": "07/07",
      "spouse_id": null,
      "spouse": null,
      "minister_id": "f181be5a-a5b1-4540-a912-46e3fc888718",
      "partner_id": "f35d00a7-841f-40de-acde-19e303b0d6f8"
    },
    ...
  ]
  */
  get: async (req, res) => {
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
