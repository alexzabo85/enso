const mongooseInit = async (mongoose) => {
  mongoose.pluralize(null);
  mongoose.set('debug', false);
  mongoose.set('autoIndex', true);
  mongoose.Promise = Promise
}

const config = {

  env: process.env.NODE_ENV || 'development',

  port: process.env.PORT || 3000,

  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",


  mongoUris: [
    `mongodb://${(process.env.IP || 'localhost')}:${(process.env.MONGO_PORT || '27017')}/ENSO_USER`,
  ],

  mongooseInit,

  mongoDropDb: async () => { await mongoose.connection.db.dropDatabase() },

  USER_TYPES: ['A', 'B', 'C'],
  REGULAR: 'A',
}

module.exports = config;
