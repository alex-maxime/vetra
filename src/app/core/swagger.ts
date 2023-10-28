import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as process from 'process';

/**
 * Setuo Swagger
 *
 * @param {NestExpressApplication} app
 * @constructor
 */
export default function SetupOpenApi(app: NestExpressApplication) {
  const config = new DocumentBuilder().setTitle('Vetra API').setDescription("The Vetra app's (API Test technique Dougs)").setVersion(process.env.npm_package_version).setContact('Alex Maxime Cadevall', '', 'cadevall.maxime@outlook.com').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}
