/**
 * Types Definition
 */

export type DatabaseConf = {
  readonly dbUser: string;
  readonly dbPassword: string;
};

// Types
export type HostConf = {
  readonly port: number;
  readonly server: string;
  readonly ip: string;
};

export type HostConfParams = {
  readonly server?: string;
};

export type ServerConf = {
  readonly env: 'development' | 'production' | 'qa' | 'test' | null;
  readonly database: DatabaseConf;
  readonly server: HostConf;
  readonly security: any;
};
