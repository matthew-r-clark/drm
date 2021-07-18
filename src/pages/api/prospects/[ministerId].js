import router from '@@router';
import supabase from '@@supabase';
import YAML from 'yaml';
import {
  assoc,
  isEmpty,
  omit,
  pipe,
  propOr,
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
      .match({ minister_id: ministerId, is_pledge_submitted: false });
    if (data && isEmpty(data)) {
      res.status(404).send(`No prospects found for minister with ID ${ministerId}.`);
    } else if (error) {
      res.status(400).send(error);
    } else {
      const payload = data.map((prospect) => pipe(
        assoc('partner', prospect.partners),
        assoc('notes', YAML.parse(propOr('', 'notes', prospect))),
        omit(['partners', 'minister_id', 'partner_id']),
      )(prospect));
      res.status(200).json(payload);
    }
  },
};

export default router(api);
