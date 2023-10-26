import { Movement } from '../entities/movement.entity';
import { CheckPoint } from '../entities/check-point.entity';
import { TransactionStatus } from '../enums/status';
import {
  isAfterDate,
  isBeforeDate,
  isSameDate,
  isSameOrAfterDate,
  isSameOrBeforeDate,
} from './utils';

export class MovementsListService {
  /**
   * Liste des transactions
   *
   * @type {Movement[]}
   */
  movements: Movement[] = [];

  /**
   * Liste des transactions sans doublons
   *
   * @type {Movement[]}
   */
  uniqueMovements: Movement[] = [];

  /**
   * Liste des transactions en doubles
   *
   * @type {Movement[]}
   */
  duplicatedMovements: Movement[] = [];

  /**
   * Initialisation avec des transactions
   *
   * @param {Movement[]} movements
   */
  constructor(movements: Movement[]) {
    this.movements = this.sortMovementsByDate(movements);
    this.getDuplicatedMovement();
  }

  /**
   * Retourne `true` si on a des transactions
   *
   * @returns {boolean}
   */
  hasMovements(): boolean {
    return this.movements.length > 0;
  }

  /**
   * Trie les transactions par date
   *
   * @param {Movement[]} movements
   * @returns {Movement[]}
   */
  sortMovementsByDate(movements: Movement[]): Movement[] {
    return movements.sort((a: Movement, b: Movement) => {
      // We Assume we compare date in the format YYYY-MMM-DD to avoid check for hours, minute and timezones
      if (isAfterDate(a.date, b.date)) {
        return 1;
      }
      if (isBeforeDate(a.date, b.date)) {
        return -1;
      }
      return 0;
    });
  }

  /**
   * Retourne la liste des transactions en double
   * et stock dans `this.duplicatedMovements` (instance de la classe)
   *
   * @returns {Movement[]}
   */
  private getDuplicatedMovement(): Movement[] {
    this.duplicatedMovements = []; // Flush old value
    this.uniqueMovements = this.movements.reduce(
      (accumulator, currentMovement) => {
        const duplicateMove: Movement = accumulator.find(
          (move: Movement) =>
            isSameDate(move.date, currentMovement.date) &&
            move.amount === currentMovement.amount &&
            move.wording === currentMovement.wording,
        );
        if (!duplicateMove) {
          accumulator.push(currentMovement);
        } else {
          this.duplicatedMovements.push(
            { ...duplicateMove, status: TransactionStatus.DUPLICATED },
            { ...currentMovement, status: TransactionStatus.DUPLICATED },
          );
        }
        return accumulator;
      },
      <Movement[]>[],
    );
    return this.duplicatedMovements;
  }

  /**
   * Retourne `true` si des transactions sont en double
   *
   * @returns {boolean}
   */
  hasDuplicateMovements(): boolean {
    return this.duplicatedMovements.length > 0;
  }

  /**
   * Retourne la liste des transactions après une point de contrôle
   *
   * @param {CheckPoint} checkPoint
   * @returns {Movement[]} Liste des transactions
   */
  getMovementsAfterCheckPoint(checkPoint: CheckPoint): Movement[] {
    return this.movements.filter((movement: Movement) =>
      isSameOrAfterDate(movement.date, checkPoint.date),
    );
  }

  /**
   * Retourne la liste des transactions avant une point de contrôle
   *
   * @param {CheckPoint} checkPoint
   * @returns {Movement[]} Liste des transactions
   */
  getMovementsBeforeCheckPoint(checkPoint: CheckPoint): Movement[] {
    return this.movements.filter((movement: Movement) =>
      isSameOrBeforeDate(movement.date, checkPoint.date),
    );
  }

  /**
   * Retourne la liste des transactions entre deux points de contrôle
   *
   * @param {CheckPoint} startCheckPoint premier point de control
   * @param {CheckPoint} endCheckPoint deuxième point
   * @returns {Movement[]} Liste des transactions
   */
  getMovementsBetweenCheckPoint(
    startCheckPoint: CheckPoint,
    endCheckPoint: CheckPoint,
  ): Movement[] {
    let start: Date = startCheckPoint.date;
    let end: Date = endCheckPoint.date;

    // In any case 😅
    if (isBeforeDate(end, start)) {
      start = endCheckPoint.date;
      end = startCheckPoint.date;
    }

    return this.movements.filter(
      (movement: Movement) =>
        isSameOrAfterDate(movement.date, start) &&
        isSameOrBeforeDate(movement.date, end),
    );
  }

  static getTotalBalanceOfMovements(movements: Movement[]): number {
    return movements.reduce((accumulator, currentMovement) => {
      return accumulator + currentMovement.amount;
    }, 0);
  }
}
