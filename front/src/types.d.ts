import { ReasonStatus } from './enums/status';
import { CheckPointInterface, MovementInterface } from './interfaces';

export declare type Reason = {
  data?: MovementInterface[];
  checkpoint?: CheckPointInterface;
  reason:
    | ReasonStatus.DUPLICATE_TRANSACTION_ENTRY
    | ReasonStatus.MISSING_TRANSACTION_ENTRY
    | ReasonStatus.MISSING_CHECK_POINT
    | ReasonStatus.MISSMATCH_TRANSACTION_AND_CHECK_POINT;
};

export declare type MovementResponseBody = {
  message?: string;
  reasons: Reason[];
};

export declare type MovementAcceptedResponseBody = {
  message: string;
};

export declare type MovementState = {
  movements: MovementInterface[];
  balances: CheckPointInterface[];
};

export declare type MovementReducerAction = {
  type: string;
  payload: any | MovementInterface;
};

export declare type MovementReducerInitialState = {
  status: string;
  datas: MovementState;
};

export declare type MovementsSampleDatasType = {
  title: string;
  key: string;
};
