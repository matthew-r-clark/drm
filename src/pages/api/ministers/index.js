import router from '@@router';
import supabase from '@@supabase';
import { isEmpty, omit } from 'ramda';

const api = {
  get: async (req, res) => {
    let { limit = 15, page = 1 } = req.query;
    limit = Number(limit);
    page = Number(page);
    const query = omit(['limit', 'page'], req.query);
    const startRange = (page - 1) * limit;
    const endRange = startRange + limit - 1;
    const { data, error, count } = await supabase
      .from('ministers')
      .select('*', { count: 'exact' })
      .match(query)
      .range(startRange, endRange);
    if (data && isEmpty(data)) {
      res.status(404).send(`No ministers found matching query:\n${JSON.stringify(query)}`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      const pages = Math.ceil(count / limit);
      const payload = {
        limit,
        page,
        pages,
        page_count: data.length,
        total_count: count,
        data,
      };
      res.status(200).json(payload);
    }
  },

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
