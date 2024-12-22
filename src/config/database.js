import { Sequelize } from "sequelize";
import { config } from './config.js';

const sequelize = new Sequelize(
  config.db.database, 
  config.db.user, 
  config.db.password, 
  {
    host: config.db.host, 
    port: config.db.port,
    dialect: 'mssql', 
    dialectOptions: {
      options: {
        encrypt: config.db.encrypt === 'true',
        trustServerCertificate: config.db.trustCertificate === 'true', 
      },
    },
    logging: config.db.logging === 'true',
  }
);

export default sequelize;