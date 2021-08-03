import router from '@@router';
import supabase from '@@supabase';
import YAML from 'yaml';
import {
  assoc,
  isEmpty,
  pipe,
  propOr,
} from 'ramda';

const api = {
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
      const payload = data.map((prospect) => pipe(
        assoc('notes', YAML.parse(propOr('', 'notes', prospect))),
      )(prospect));
      res.status(200).json(payload);
    }
  },
};

export default router(api);
