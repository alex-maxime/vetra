import { Module } from '@nestjs/common';
import { ValidateMovementsService } from './services/validate-movements.service';
import { MovementsController } from './controllers/movements.controller';

@Module({
  controllers: [MovementsController],
  providers: [ValidateMovementsService],
})
export class MovementsModule {}
