module.exports = {
  serverRuntimeConfig: {
    supabase: {
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_KEY,
    },
  },
  publicRuntimeConfig: {
    apiAuthKey: process.env.NEXT_PUBLIC_API_AUTH_KEY,
  },
};
