import net from 'net';

/**
 * Check if port is free or not
 *
 * @param {number} port port to verify
 * @returns {Promise<boolean>}
 */
export async function isPortFree(port: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const sock = net.createConnection(port);
    sock.once('connect', () => {
      sock.end();
      return resolve(false);
    });
    sock.once('error', (e: Error | any) => {
      sock.destroy();
      if (e.code === 'ECONNREFUSED') {
        return resolve(true);
      } else {
        return reject(e);
      }
    });
  });
}
