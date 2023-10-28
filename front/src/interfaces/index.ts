import { TransactionStatus } from '../enums/status';

export interface CheckPointInterface {
  date: string | Date;

  balance: number;
}

export interface MovementInterface {
  id: number | undefined | null;
  date: string | Date;
  label: string;
  amount: number;
  status?:
    | TransactionStatus.VALID
    | TransactionStatus.INVALID
    | TransactionStatus.DUPLICATED
    | TransactionStatus.NO_CHECK_POINT;
}
