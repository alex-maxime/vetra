import { TransactionStatus } from '../enums/status';

export interface CheckPointInterface {
  date: Date;

  balance: number;
}

export interface MovementInterface {
  id: number;
  date: Date;
  label: string;
  amount: number;
  status?: TransactionStatus.VALID | TransactionStatus.INVALID | TransactionStatus.DUPLICATED | TransactionStatus.NO_CHECK_POINT;
}
