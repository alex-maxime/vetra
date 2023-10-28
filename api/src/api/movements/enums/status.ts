export enum ReasonStatus {
  DUPLICATE_TRANSACTION_ENTRY = 'DUPLICATE_TRANSACTION_ENTRY',
  MISSING_TRANSACTION_ENTRY = 'MISSING_TRANSACTION_ENTRY',
  MISSMATCH_TRANSACTION_AND_CHECK_POINT = 'MISSMATCH_TRANSACTION_AND_CHECK_POINT',
  MISSING_CHECK_POINT = 'MISSING_CHECK_POINT',
}

export enum TransactionStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  DUPLICATED = 'DUPLICATED',
  NO_CHECK_POINT = 'NO_CHECK_POINT',
}