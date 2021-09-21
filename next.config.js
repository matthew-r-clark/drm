/* eslint-disable no-param-reassign */
const path = require('path');

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
  webpack: (config) => {
    config.resolve.alias.components = path.resolve(__dirname, 'src/components');
    config.resolve.alias.modules = path.resolve(__dirname, 'src/modules');
    config.resolve.alias.styles = path.resolve(__dirname, 'src/styles');
    return config;
  },
};
