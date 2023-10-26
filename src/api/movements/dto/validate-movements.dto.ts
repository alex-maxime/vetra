import { ArrayUnique, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Movement } from '../entities/movement.entity';
import { CheckPoint } from '../entities/check-point.entity';
import { Type } from 'class-transformer';

/**
 * Request DTO
 */
export class ValidateMovementsRequestDto {
  @ApiProperty({
    description: 'Liste des transactions bancaire',
    required: true,
    type: () => [Movement],
  })
  @IsArray()
  @ArrayUnique<Movement>((o: Omit<Movement, 'status'>) => o.id, {
    message:
      "Des opérations bancaires possèdent le même 'id'. Assurez vous d'envoyer des élements avec un ID unique",
  })
  @ValidateNested({ each: true })
  @Type(() => Movement)
  movements: Movement[];

  @ApiProperty({
    description: 'Liste des points de contrôles',
    required: true,
    type: () => [CheckPoint],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckPoint)
  balances: CheckPoint[];
}
