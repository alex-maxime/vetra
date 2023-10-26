import db from './base/database.conf';
import server from './base/server.conf';
import security from './base/security.conf';
import { ServerConf } from './types';

/**
 * Development configuration
 *
 * @type {ServerConf}
 */
export default (): ServerConf => ({
  env: 'development',
  database: db(),
  server: server({}),
  security: security(),
});
