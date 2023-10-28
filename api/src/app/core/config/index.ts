import production from './production.config';
import development from './development.config';
import qa from './qa.config';
import testing from './testing.config';
import { ServerConf } from './types';

/**
 * Api configuration
 * according `APP_CONFIG` variable in .env's file
 *
 * @returns {ServerConf}
 */
export default (): ServerConf => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return production();
    case 'qa':
      return qa();
    case 'test':
      return testing();
    default:
      return development();
  }
};
