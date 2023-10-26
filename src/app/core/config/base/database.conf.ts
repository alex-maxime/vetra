import { DatabaseConf } from '../types';

/**
 * Database configuration
 *
 * @type {DatabaseConf}
 */
export default (): DatabaseConf => ({
  dbUser: process.env.DATABASE_USER || 'dbuser12345',
  dbPassword: process.env.DATABASE_PASSWORD || 'db_12345_password',
});
