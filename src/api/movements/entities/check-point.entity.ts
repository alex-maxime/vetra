import { CheckPointInterface } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CheckPoint implements CheckPointInterface {
  @ApiProperty({
    description: 'Date du check point',
    required: true,
    type: Date,
    example: new Date().toISOString(),
  })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'Solde aux point de vérification',
    required: true,
    example: 257,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  balance: number;
}
