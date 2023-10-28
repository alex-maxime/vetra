import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { MovementAcceptedResponse } from '../../constants';
import { ValidateMovementsRequestDto } from '../dto/validate-movements.dto';
import { ApiAcceptedResponse, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidateMovementsService } from '../services/validate-movements.service';

@ApiTags('movements')
@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: ValidateMovementsService) {}

  @Post('validation')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiBody({
    description: 'List of cats',
    type: ValidateMovementsRequestDto,
  })
  @ApiAcceptedResponse({
    description: 'Les données de synchronisation sont valide',
    status: HttpStatus.ACCEPTED,
    type: MovementAcceptedResponse,
  })
  @ApiResponse({
    status: HttpStatus.I_AM_A_TEAPOT,
    description: "Les données de synchronisation ne sont pas valide à cause d'un doublon ou un manquant",
    schema: {
      title: 'MovementException',
      allOf: [
        {
          properties: {
            message: {
              type: 'string',
              default: 'I’m a teapot',
            },
            reasons: {
              type: 'array',
              default: [],
            },
          },
        },
      ],
    },
  })
  validateMovements(@Body() movements: ValidateMovementsRequestDto): any | MovementAcceptedResponse {
    return this.movementsService.isValid(movements); // this.movementsService.create(createMovementDto);
  }
}
