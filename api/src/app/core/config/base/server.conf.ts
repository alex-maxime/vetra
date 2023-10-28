import os from 'os';
import { HostConf, HostConfParams } from '../types';

// Default IP
let ip = '127.0.0.1';

// Let's detect if NODE_ENV is defined to 'development' or not
// To have the IP address on the network
// It will help to configure EXPO App
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  const netInterfaces = (!!os && 'networkInterfaces' in os && os.networkInterfaces()) || null;
  if (!!netInterfaces && !!Object.values(netInterfaces) && Object.values(netInterfaces).length > 0) {
    const interfaces = (Object.values(netInterfaces) || []).flat();
    if (interfaces && interfaces.length > 0) {
      const inet: any = Object.values(netInterfaces)
        .flat()
        .find((i: any) => i.family === 'IPv4' && !i.internal);
      ip = (inet && inet.address) || '127.0.0.1';
    }
  } else {
    ip = '127.0.0.1';
  }
}

/**
 * Host configuration to define ports and IP
 *
 * @type {HostConf}
 */
export default ({ server = '' }: HostConfParams): HostConf => {
  const _server =
    (ip !== 'localhost' && process.env.API_HOSTNAME) || // If we have a vhost defined in the .env file
    `http://${ip}:${process.env.PORT || 8080}`;

  return {
    port: parseInt(process.env.PORT, 10) || 8080,
    server: server || _server,
    ip,
  };
};
