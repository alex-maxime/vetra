import {
  Global,
  Module,
  OnApplicationBootstrap,
  OnModuleInit,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './core/config';
import { consola } from 'consola';
import { HostConf } from './core/config/types';
import { isPortFree } from './core/utils';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { MovementExceptionsFilter } from './core/exceptions/movement-exceptions.filter';
import { ApiModule } from '../api/api.module';

// Juste de l'esthétique 😅
consola.wrapConsole();

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      expandVariables: true,
    }),
    ApiModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        enableDebugMessages: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: MovementExceptionsFilter,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap, OnModuleInit {
  constructor(private configService: ConfigService) {}

  onApplicationBootstrap(): any {
    const env = this.configService.get<string>('env');
    const serverConf: HostConf = this.configService.get<HostConf>('server');
    let output: string = `Env.: ${env}\n`;
    output += `Listening on http://0.0.0.0:${serverConf.port}`;
    consola.box(output);
  }

  async onModuleInit(): Promise<void> {
    const serverConf: HostConf = this.configService.get<HostConf>('server');
    const env = this.configService.get<string>('env');

    if (env !== 'test') {
      const canUsePort = await isPortFree(serverConf.port);
      if (!canUsePort) {
        throw new Error(
          `port: ${serverConf.port} cannot be used, configure another port in .env file or ensure this one is free`,
        );
      }
    }
  }
}
