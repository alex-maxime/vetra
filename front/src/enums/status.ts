export enum ReasonStatus {
  DUPLICATE_TRANSACTION_ENTRY = 'DUPLICATE_TRANSACTION_ENTRY',
  MISSING_TRANSACTION_ENTRY = 'MISSING_TRANSACTION_ENTRY',
  MISSMATCH_TRANSACTION_AND_CHECK_POINT = 'MISSMATCH_TRANSACTION_AND_CHECK_POINT',
  MISSING_CHECK_POINT = 'MISSING_CHECK_POINT'
}
export enum ReasonStatusText {
  DUPLICATE_TRANSACTION_ENTRY = 'Il existe des opérations en double',
  MISSING_TRANSACTION_ENTRY = 'Il manque des opérations pour valider un point de contrôle',
  MISSMATCH_TRANSACTION_AND_CHECK_POINT = 'La somme des opérations ne correspond pas à un point de control',
  MISSING_CHECK_POINT = 'Il existe des opérations sans point de contrôle'
}

export enum TransactionStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  DUPLICATED = 'DUPLICATED',
  NO_CHECK_POINT = 'NO_CHECK_POINT'
}
