import router from '@@router';
import supabase from '@@supabase';
import { isEmpty } from 'ramda';

const api = {
  /* Example response:
  [
    {
      "id": "cd8d8e03-d4cd-4564-9f26-ddce51533900",
      "name": "Ronni Shovelbottom",
      "status": "pledged - need to submit",
      "last_contacted": "2021-01-20",
      "notes": {
        "prospect": [
          "In hac habitasse platea dictumst"
        ],
        "pledge": null,
        "general": null
      },
      "other_ministers": [
        "Gennifer M",
        "Gianina R"
      ],
      "pledged_one_time_cents": 186516,
      "pledged_recurring_cents": null,
      "address": {
        "line1": "57409 2nd Hill",
        "line2": null,
        "city": "Reston",
        "state": "VA",
        "zipCode": "20195"
      },
      "email": "zshovelbottom40@amazon.com",
      "phone": "703-535-6425",
      "birthday": "01/01",
      "minister_id": "cc4138b1-9d10-4d21-9c12-a77eecf34bf4",
      "partner_id": "e06de4ca-e49b-491c-861d-baf49ea6baa4"
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
    if (data && isEmpty(data)) {
      res.status(404).send(`No prospects found for minister with ID ${ministerId}.`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(data);
    }
  },
};

export default router(api);
