import Constants from 'expo-constants';

/**
 * petit hack pour ne pas saisir l'adresse ip manuellement 🌚
 */
export const getApiURL = () => {
  return Constants.expoGoConfig &&
    typeof Constants.expoGoConfig.packagerOpts === `object` &&
    Constants.expoGoConfig.packagerOpts.dev
    ? `http://${Constants.expoGoConfig.debuggerHost.split(`:`).shift().concat(':8080')}`
    : 'http://localhost:8080';
};

export default {
  getApiURL
};
