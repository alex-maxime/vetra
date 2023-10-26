import { Injectable } from '@nestjs/common';
import { ValidateMovementsRequestDto } from '../dto/validate-movements.dto';
import { MovementsListService } from './movements-list.service';
import { CheckPointsListService } from './check-points-list.service';
import { MovementException } from '../../../app/core/exceptions/movement-exceptions';
import { ReasonStatus, TransactionStatus } from '../enums/status';
import { CheckPoint } from '../entities/check-point.entity';
import { Movement } from '../entities/movement.entity';
import { MovementAcceptedResponse } from '../../constants';

@Injectable()
export class ValidateMovementsService {
  movementsService: MovementsListService;
  checkPointService: CheckPointsListService;

  isValid(validation: ValidateMovementsRequestDto): MovementAcceptedResponse {
    this.movementsService = new MovementsListService(validation.movements);
    this.checkPointService = new CheckPointsListService(validation.balances);
    // 1 - On si on a des points de contrôles et des transactions
    if (
      this.movementsService.hasMovements() &&
      !this.checkPointService.hasCheckPoints()
    ) {
      throw new MovementException([
        {
          reason: ReasonStatus.MISSING_CHECK_POINT,
          data: this.movementsService.movements.map((move: Movement) => ({
            ...move,
            status: TransactionStatus.NO_CHECK_POINT,
          })),
        },
      ]);
    }

    // 2 - On vérifie s'il y a des doublons
    if (this.movementsService.hasDuplicateMovements()) {
      throw new MovementException([
        {
          data: this.movementsService.duplicatedMovements,
          reason: ReasonStatus.DUPLICATE_TRANSACTION_ENTRY,
        },
      ]);
    }

    // 3 - On vérifie s'il y a des points de contrôle manquant
    //     des transactions après le dernier point de contrôle
    const lastCheckPoint: CheckPoint =
      this.checkPointService.getLastCheckPoint();
    const movementAfterCheckPoint: Movement[] =
      this.movementsService.getMovementsAfterCheckPoint(lastCheckPoint);

    if (movementAfterCheckPoint.length > 0) {
      throw new MovementException([
        {
          reason: ReasonStatus.MISSING_CHECK_POINT,
          data: movementAfterCheckPoint.map((movement) => ({
            ...movement,
            status: TransactionStatus.NO_CHECK_POINT,
          })),
        },
      ]);
    }

    // 4 Analysons 🤔
    return this.isAllValidMovements();
  }

  private isAllValidMovements(): MovementAcceptedResponse {
    let lastValidCheckPoint: CheckPoint;
    let lastTotal: number = 0;

    for (
      let index = 0;
      index < this.checkPointService.checkPoints.length;
      index++
    ) {
      const lastCheckPointElement = this.checkPointService.checkPoints[index];

      const movements = lastValidCheckPoint
        ? this.movementsService.getMovementsBetweenCheckPoint(
            lastValidCheckPoint,
            lastCheckPointElement,
          )
        : this.movementsService.getMovementsBeforeCheckPoint(
            lastCheckPointElement,
          );

      const calcul =
        lastTotal + MovementsListService.getTotalBalanceOfMovements(movements);

      if (calcul !== lastCheckPointElement.balance) {
        throw new MovementException([
          {
            reason:
              lastTotal < lastCheckPointElement.balance
                ? ReasonStatus.MISSING_TRANSACTION_ENTRY
                : ReasonStatus.MISSMATCH_TRANSACTION_AND_CHECK_POINT,
            checkpoint: lastCheckPointElement,
            data: movements.map((movement) => ({
              ...movement,
              status: TransactionStatus.INVALID,
            })),
          },
        ]);
      }

      lastValidCheckPoint = lastCheckPointElement;
      lastTotal = lastCheckPointElement.balance;
    }
    return new MovementAcceptedResponse();
  }
}
