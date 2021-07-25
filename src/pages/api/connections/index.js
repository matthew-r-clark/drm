import router from '@@router';
import supabase from '@@supabase';

const api = {
  post: async (req, res) => {
    const newPartner = req.body;
    const { data, error } = await supabase
      .from('ministers_partners')
      .insert(newPartner);
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(201).json(data);
    }
  },
};

export default router(api);
