const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/test1',
  port: process.env.PORT || 8000,
  JWT_TOKEN: 'tokenTest'
};

export default config;
