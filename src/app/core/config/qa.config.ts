import db from './base/database.conf';
import server from './base/server.conf';
import security from './base/security.conf';
import { ServerConf } from './types';

/**
 * QA configuration
 *
 * @type {ServerConf}
 */
export default (): ServerConf => ({
  env: 'qa',
  database: db(),
  security: security(
    '{E]Q4iR47e1vtg6%M_/ZE8%$M%yh3}w]C8y./N#RtUjbZ2F+I/c:Q`vq*m{~}?X',
  ),
  server: server({
    server: 'https://qa.api.platip.com',
  }),
});
