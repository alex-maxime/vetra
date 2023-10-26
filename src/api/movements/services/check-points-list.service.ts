import { CheckPoint } from '../entities/check-point.entity';
import { isAfterDate, isBeforeDate } from './utils';

export class CheckPointsListService {
  /**
   * Liste des points de contrôles
   *
   * @type {CheckPoint[]}
   */
  checkPoints: CheckPoint[] = [];

  /**
   * Initialisation
   *
   * @param {CheckPoint[]} checkPoints
   */
  constructor(checkPoints: CheckPoint[]) {
    this.checkPoints = this.sortCheckpointsByDate(checkPoints);
  }

  /**
   * Retourne `true` si on a des points de contrôles
   *
   * @returns {boolean}
   */
  hasCheckPoints(): boolean {
    return this.checkPoints.length > 0;
  }

  /**
   * Trie les transactions par date
   *
   * @param {CheckPoint[]} checkPoints
   * @returns {CheckPoint[]}
   */
  sortCheckpointsByDate(checkPoints: CheckPoint[]): CheckPoint[] {
    return checkPoints.sort((a: CheckPoint, b: CheckPoint) => {
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
   * Retourne le dernier élément de la liste des points de contrôle
   *
   * @returns {CheckPoint}
   */
  getLastCheckPoint(): CheckPoint {
    return this.checkPoints[this.checkPoints.length - 1];
  }
}
