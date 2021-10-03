import router from 'modules/router';
import supabase from 'modules/supabase';
import { isEmpty, omit } from 'ramda';

const api = {
  /* GET all ministers
  sample request:
  api/ministers/?is_admin=true&limit=15&page=1
  * limit and page are not required, but will default to values shown below

  sample response:
  {
    "limit": 15,
    "page": 1,
    "pages": 3,
    "page_count": 15,
    "total_count": 32,
    "data": [
      {
        "id": "68044bf6-9eae-4a2b-8a38-823c13fbffef",
        "first_name": "Abba",
        "last_name": "Lawday",
        "email": "abbal@anyfocus.org",
        "is_admin": true,
        "is_apprentice": false,
        "fundraising_goal_dollars": null,
        "coach_id": null
      },
      ...
    ]
  }
  */
  get: async (req, res) => {
    const { data, error } = await supabase
      .from('ministers')
      .select();
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(data);
    }
  },

  /* POST (create) new ministers
  sample body:
  [
    {
      "first_name": "Jon",
      "last_name": "Smith",
      "email": "jons@anyfocus.org",
      "is_admin": true,
      "is_apprentice": false,
      "fundraising_goal_dollars": 3000,
      "coach_id": "3b6fc528-4f59-4f56-ab53-dd4c1b91b0b1"
    },
    ...
  ]
  * is_admin, is_apprentice, fundraising_goal_dollars, and coach_id are all optional
  * is_admin and is_apprentice default to: false
  * if only adding a single minister, can send object without enclosing array
    response is always an array

  sample response:
  [
    {
      "id": "7b1ca639-61e5-41e9-889b-dd6d3d19af42",
      "first_name": "Jon",
      "last_name": "Smith",
      "email": "jons@anyfocus.org",
      "is_admin": true,
      "is_apprentice": false,
      "fundraising_goal_dollars": 3000,
      "coach_id": "3b6fc528-4f59-4f56-ab53-dd4c1b91b0b1"
    },
    ...
  ]
  */
  post: async (req, res) => {
    const { data, error } = await supabase
      .from('ministers')
      .insert(req.body);
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(201).json(data);
    }
  },
};

export default router(api);
