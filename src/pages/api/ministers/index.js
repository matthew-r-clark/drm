import router from '@@router';
import supabase from '@@supabase';

const api = {
  get: async (req, res) => {
    const { data, error } = await supabase
      .from('staff')
      .select('*');
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).send(error);
    }
  },
};

export default router(api);