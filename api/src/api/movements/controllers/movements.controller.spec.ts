import { Test, TestingModule } from '@nestjs/testing';
import { MovementsController } from './movements.controller';
import { ValidateMovementsService } from '../services/validate-movements.service';
import { ValidateMovementsRequestDto } from '../dto/validate-movements.dto';
import { ValidMovementsRequest } from '../mocks/valid-movements-request';

describe('MovementsController', () => {
  let controller: MovementsController;
  let movementsServices: ValidateMovementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementsController],
      providers: [ValidateMovementsService],
    }).compile();

    controller = module.get<MovementsController>(MovementsController);
    movementsServices = module.get<ValidateMovementsService>(ValidateMovementsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('validateMovements success', () => {
    const response = { message: 'Accepted' };
    jest.spyOn(movementsServices, 'isValid').mockImplementation(() => response);
    // @ts-ignore
    expect(controller.validateMovements(ValidMovementsRequest as ValidateMovementsRequestDto)).toBe(response);
  });

  it('validateMovements fail', () => {
    const response = {
      message: {
        message: ['movements.0.property idx should not exist', 'movements.0.id must be a number conforming to the specified constraints'],
        error: 'Bad Request',
        statusCode: 400,
      },
      statusCode: 400,
      timestamp: '2023-10-26T03:11:12.396Z',
      path: '/api/movements/validation',
    };
    const body = {
      movements: [
        {
          idx: 1,
          date: '2023-01-01',
          label: 'Transaction Bancaire',
          amount: 1000,
        },
        {
          id: 2,
          date: '2023-01-01',
          label: 'Transaction Bancaire',
          amount: 3000,
        },
        {
          id: 3,
          date: '2023-01-01',
          label: 'Transaction Bancaire',
          amount: -1000,
        },
      ],
      balances: [
        {
          balance: 3000,
          date: '2023-02-01',
        },
      ],
    };
    // @ts-ignore
    jest.spyOn(movementsServices, 'isValid').mockImplementation(() => response);
    // @ts-ignore
    expect(controller.validateMovements(body as ValidateMovementsRequestDto)).toBe(response);
  });
});
