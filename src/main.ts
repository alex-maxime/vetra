import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { HostConf } from './app/core/config/types';
import SetupOpenApi from './app/core/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn'],
    cors: true,
  });

  // Prefix all routes with /api
  app.setGlobalPrefix('api', { exclude: ['health'] });

  const configService = app.get(ConfigService);

  if (configService.get<string>('env') !== 'production') {
    //load swagger if not in production
    SetupOpenApi(app);
  }
  const serverConf: HostConf = configService.get<HostConf>('server');
  await app.listen(serverConf.port);

  let output: string = 'Server is listening..';
  output += `\n● IP For expo app ! 📲\n`;
  output += `  ▸ server:  ${serverConf.server}`;
  console.info(output);
}
bootstrap();
