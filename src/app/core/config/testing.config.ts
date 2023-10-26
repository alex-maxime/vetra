import db from './base/database.conf';
import server from './base/server.conf';
import security from './base/security.conf';
import { ServerConf } from './types';

/**
 * Testing environment  configuration
 *
 * @type {ServerConf}
 */
export default (): ServerConf => ({
  env: 'test',
  database: db(),
  server: server({}),
  security: security('testSecurityToken'),
});
