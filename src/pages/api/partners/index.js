import router from 'modules/router';
import supabase from 'modules/supabase';
import { isEmpty, omit } from 'ramda';

const api = {
  /* GET all partners
  sample request:
  api/partners/?is_married=true&limit=15&page=1
  * limit and page are not required, but will default to values shown below

  sample response:
  {
    "limit": 15,
    "page": 1,
    "pages": 67,
    "page_count": 15,
    "total_count": 1002,
    "data": [
      {
        "id": "2ea4cb08-76cb-4fed-91e2-5169f84bbf4c",
        "address_line_1": "6 Blue Bill Park Lane",
        "address_line_2": null,
        "city": "Baton Rouge",
        "state": "LA",
        "zip_code": "70894",
        "email": "edixseeq@ca.gov",
        "phone": "225-179-8863",
        "birthday": "08/18",
        "is_married": false,
        "preferred_contact_method": "text",
        "spouse_id": null,
        "aliases": [
          "Mylo Dixsee",
          "Olym Dixsee"
        ]
      },
      ...
    ]
  }
  */
  get: async (req, res) => {
    // let { limit = 15, page = 1 } = req.query;
    // limit = Number(limit);
    // page = Number(page);
    // const query = omit(['limit', 'page'], req.query);
    // const startRange = (page - 1) * limit;
    // const endRange = startRange + limit - 1;
    // const { data, error, count } = await supabase
    //   .from('partners')
    //   .select('*', { count: 'exact' })
    //   .match(query)
    //   .range(startRange, endRange);
    // if (data && isEmpty(data)) {
    //   res.status(404).send(`No partners found matching query:\n${JSON.stringify(req.query)}`);
    // } else if (error) {
    //   res.status(400).send(error);
    // } else {
    //   const pages = Math.ceil(count / limit);
    //   const payload = {
    //     limit,
    //     page,
    //     pages,
    //     page_count: data.length,
    //     total_count: count,
    //     data,
    //   };
    //   res.status(200).json(payload);
    // }
    const { data, error } = await supabase
      .from('partners')
      .select();
    if (data && isEmpty(data)) {
      res.status(404).send('There were no partners found.');
    } else if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json(data);
    }
  },

  /* POST (create) new partners
  sample body:
  [
    {
      "aliases": [
        "Matthew Clark",
        "Matt Clark"
      ],
      "email": "clark.matthewr@gmail.com",
      "address_line_1": "123 Test Street",
      "address_line_2": "Apt. 456",
      "city": "Dallas",
      "state": "TX",
      "zip_code": "75000",
      "phone": "817-992-3987",
      "birthday": "03/25",
      "is_married": true,
      "preferred_contact_method": "text",
      "spouse_id": "00e24e89-2d88-4023-8ac6-a41c9771c06c"
    },
    ...
  ]
  * aliases is the only required field, array must include one name (string)
  * if only adding a single partner, can send object without enclosing array
    response is always an array

  sample response:
  [
    {
      "id": "03dddf6b-002d-45b1-9d4f-3ec458e8f9f2",
      "address_line_1": "123 Test Street",
      "address_line_2": "Apt. 456",
      "city": "Dallas",
      "state": "TX",
      "zip_code": "75000",
      "email": "clark.matthewr@gmail.com",
      "phone": "817-992-3987",
      "birthday": "03/25",
      "is_married": true,
      "preferred_contact_method": "text",
      "spouse_id": "00e24e89-2d88-4023-8ac6-a41c9771c06c",
      "aliases": [
        "Matthew Clark",
        "Matt Clark"
      ]
    },
    ...
  ]
  */
  post: async (req, res) => {
    const { data, error } = await supabase
      .from('partners')
      .insert(req.body);
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(201).json(data);
    }
  },
};

export default router(api);
