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

  put: (req, res) => {},

  post: (req, res) => {},

  delete: (req, res) => {},
};

export default router(api);
