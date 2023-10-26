import { TransactionStatus } from '../enums/status';
import { MovementInterface } from '../interfaces';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class Movement implements MovementInterface {
  @ApiProperty({
    description: 'ID de la transaction',
    required: true,
    example: 7,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  id: number;

  @ApiProperty({
    description: 'Date de la transaction',
    required: true,
    example: '2023-12-19',
  })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'label ou description de la transaction',
    required: true,
    example: 'Hotel F.1 1 nuit et 1 persone',
  })
  @IsString()
  wording: string;

  @ApiProperty({
    description: 'Montant de la transaction',
    required: true,
    example: -247,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  amount: number;

  @ApiHideProperty()
  @IsOptional()
  status?:
    | TransactionStatus.VALID
    | TransactionStatus.INVALID
    | TransactionStatus.DUPLICATED
    | TransactionStatus.NO_CHECK_POINT = TransactionStatus.VALID;
}
