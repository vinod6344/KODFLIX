const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    console.log('Connecting to MySQL...');
    console.log('Host:', process.env.DB_HOST);
    console.log('Port:', process.env.DB_PORT);
    console.log('Database:', process.env.DB_NAME);
    console.log('User:', process.env.DB_USER);
    
    await sequelize.authenticate();
    console.log('MySQL Database Connected successfully.');
    
    // Sync models with database - create tables if they don't exist
    try {
      await sequelize.sync({ force: false, alter: false });
      console.log('Database models synchronized.');
    } catch (syncError) {
      console.warn('Database sync warning:', syncError.message);
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    throw error;
  }
};

module.exports = { sequelize, connectDB };
