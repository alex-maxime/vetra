import { Movement } from './movements/entities/movement.entity';
import { ReasonStatus } from './movements/enums/status';
import { CheckPoint } from './movements/entities/check-point.entity';

export declare type Reason = {
  data?: Movement[];
  checkpoint?: CheckPoint;
  reason:
    | ReasonStatus.DUPLICATE_TRANSACTION_ENTRY
    | ReasonStatus.MISSING_TRANSACTION_ENTRY
    | ReasonStatus.MISSING_CHECK_POINT
    | ReasonStatus.MISSMATCH_TRANSACTION_AND_CHECK_POINT;
};

export declare type ExceptionResponseBody = {
  message?: string;
  statusCode?: number;
  timestamp: string;
  path: any;
  [key: string]: any;
};

export declare type MovementResponseBody = {
  message?: string;
  reasons: Array<Reason>;
};

export declare type MovementAcceptedResponseBody = {
  message: string;
};
