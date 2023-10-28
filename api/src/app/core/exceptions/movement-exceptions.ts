import { ImATeapotException } from '@nestjs/common';
import { Reason } from '../../../api/types';

/**
 * Exception to rise when invalid movement occur
 */
export class MovementException extends ImATeapotException {
  constructor(private reasons: Array<Reason> = []) {
    super();
  }

  /**
   * Get all element tha cause the exception
   * @returns {Array<Reason>}
   */
  getReasons() {
    return this.reasons;
  }
}
