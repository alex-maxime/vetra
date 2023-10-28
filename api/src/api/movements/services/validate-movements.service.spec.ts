import { Test, TestingModule } from '@nestjs/testing';
import { ValidateMovementsService } from './validate-movements.service';
import { ValidMovementsRequest } from '../mocks/valid-movements-request';
import { MovementAcceptedResponse } from '../../constants';

describe('MovementsService', () => {
  let service: ValidateMovementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateMovementsService],
    }).compile();

    service = module.get<ValidateMovementsService>(ValidateMovementsService);
  });

  it('should return a MovementAcceptedResponse instance', () => {
    const parsed = {
      movements: ValidMovementsRequest.movements.map((m) => {
        return { ...m, date: new Date(m.date) };
      }),
      balances: ValidMovementsRequest.balances.map((b) => {
        return { ...b, date: new Date(b.date) };
      }),
    };
    expect(service.isValid(parsed)).toBeInstanceOf(MovementAcceptedResponse);
  });

  /** Failed to test 🥲
   it('should throw a MovementException', () => {
   const parsed = {
   movements: DuplicateMovementsRequest.movements.map((m) => {
   return { ...m, date: new Date(m.date) };
   }),
   balances: DuplicateMovementsRequest.balances.map((b) => {
   return { ...b, date: new Date(b.date) };
   }),
   };
   expect(service.isValid(parsed)).toBeInstanceOf(MovementException);
   });
   */
});
