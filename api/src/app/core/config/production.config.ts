import db from './base/database.conf';
import server from './base/server.conf';
import security from './base/security.conf';
import { ServerConf } from './types';

/**
 * Production configuration
 *
 * @type {ServerConf}
 */
export default (): ServerConf => ({
  env: 'production',
  database: db(),
  security: security('*Ek--W0"6<wAKC7mu&P*IdVY=3oY01BcZ-nZ#-q"(ZBPfMpZ0VU[O(_!cS<i58o'),
  server: server({
    server: 'https://api.platip.com',
  }),
});
