import router from '@@router';
import supabase from '@@supabase';
import {
  assoc,
  isEmpty,
  omit,
  pipe,
} from 'ramda';

const api = {
  get: async (req, res) => {
    const { ministerId } = req.query;
    const { data, error } = await supabase
      .from('ministers_partners')
      .select(`
        *,
        partners (*)
      `)
      .match({ minister_id: ministerId, is_pledge_submitted: true });
    if (data && isEmpty(data)) {
      res.status(404).send(`Partner with ID ${ministerId} not found.`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      const payload = data.map((prospect) => pipe(
        assoc('partner', prospect.partners),
        omit(['partners', 'minister_id', 'partner_id']),
      )(prospect));
      res.status(200).json(payload);
    }
  },
};

export default router(api);
