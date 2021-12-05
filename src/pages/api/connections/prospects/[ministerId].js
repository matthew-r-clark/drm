import router from 'modules/router';
import supabase from 'modules/supabase';

const api = {
  /* GET prospects for minister by ID
  sample response:
  [
    {
      "id": "dedc0121-e83f-4bfd-89e1-fe127bca507d",
      "aliases": [
          "Pete Cunney"
      ],
      "nickname": null,
      "status": "need to send letter",
      "last_contacted": "2021-03-26",
      "notes": {},
      "is_thank_you_card_sent": false,
      "other_ministers": [
          "Padriac J",
          "Hortensia B"
      ],
      "pledge_amount_cents": null,
      "is_pledge_recurring": false,
      "address": {
          "line1": null,
          "line2": null,
          "city": null,
          "state": null,
          "zipCode": null
      },
      "email": null,
      "phone": "808-769-7786",
      "birthday": "01/02",
      "spouse_id": null,
      "spouse": null,
      "minister_id": "f181be5a-a5b1-4540-a912-46e3fc888718",
      "partner_id": "cba06737-b36b-41e9-a3bc-b92f65b5e4dc"
    },
    ...
  ]
  */
  get: async (req, res) => {
    const { ministerId } = req.query;
    const { data, error } = await supabase
      .from('prospects') // sql view
      .select()
      .match({ minister_id: ministerId });
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(data);
    }
  },
};

export default router(api);
