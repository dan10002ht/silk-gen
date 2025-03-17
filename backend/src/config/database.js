import { Sequelize } from 'sequelize';
import environment from './environment';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: environment.DB_HOST || 'localhost',
  port: environment.DB_PORT || 5432,
  database: environment.DB_NAME || 'thuyen_silk',
  username: environment.DB_USER || 'postgres',
  password: environment.DB_PASSWORD || 'postgres',
  logging: environment.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL database');

    // Sync database in development (don't use in production)
    if (environment.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database synced');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export { sequelize, connectDB };
