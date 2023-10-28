import { MovementsSampleDatasType, MovementState } from '../types';

export const DuplicateMovementsRequest: MovementState = {
  movements: [
    { id: 1, date: '2023-01-01', label: 'Transaction A', amount: 100 },
    { id: 2, date: '2023-01-01', label: 'Transaction B', amount: 200 },
    { id: 20, date: '2023-01-01', label: 'Transaction B', amount: 200 },
    { id: 3, date: '2023-01-01', label: 'Transaction C', amount: -80 },
    { id: 4, date: '2023-02-01', label: 'Transaction D', amount: -10 },
    { id: 5, date: '2023-02-01', label: 'Transaction E', amount: 859 },
    { id: 6, date: '2023-03-01', label: 'Transaction F', amount: 2500 },
    { id: 7, date: '2023-04-01', label: 'Transaction G', amount: -63.2 },
    { id: 8, date: '2023-05-01', label: 'Transaction H', amount: 50 }
  ],
  balances: [
    { balance: 220, date: '2023-01-31' },
    { balance: 1069, date: '2023-02-28' },
    { balance: 3569, date: '2023-03-31' },
    { balance: 3505.8, date: '2023-04-30' },
    { balance: 3555.8, date: '2023-05-31' }
  ]
};
export const MissingCheckpointRequest: MovementState = {
  movements: [
    { id: 1, date: '2023-01-01', label: 'Transaction A', amount: 100 },
    { id: 2, date: '2023-02-01', label: 'Transaction B', amount: 200 },
    { id: 3, date: '2023-02-01', label: 'Transaction C', amount: -80 },
    { id: 4, date: '2023-03-01', label: 'Transaction D', amount: -10 },
    { id: 5, date: '2023-04-01', label: 'Transaction E', amount: 859 },
    { id: 6, date: '2023-05-01', label: 'Transaction F', amount: 2500 },
    { id: 7, date: '2023-03-01', label: 'Transaction G', amount: -63.2 }
  ],
  balances: []
};
export const MissingCheckpointRequest2: MovementState = {
  movements: [
    { id: 1, date: '2023-01-01', label: 'Transaction A', amount: 100 },
    { id: 2, date: '2023-01-01', label: 'Transaction B', amount: 200 },
    { id: 3, date: '2023-01-01', label: 'Transaction C', amount: -80 },
    { id: 4, date: '2023-02-01', label: 'Transaction D', amount: -10 },
    { id: 5, date: '2023-02-01', label: 'Transaction E', amount: 859 },
    { id: 6, date: '2023-03-01', label: 'Transaction F', amount: 2500 },
    { id: 7, date: '2023-04-01', label: 'Transaction G', amount: -63.2 },
    { id: 8, date: '2023-05-01', label: 'Transaction H', amount: 10000 } // transaction sans point de contrôle
  ],
  balances: [
    { balance: 220, date: '2023-01-31' },
    { balance: 1069, date: '2023-02-28' },
    { balance: 3569, date: '2023-03-31' },
    { balance: 3505.8, date: '2023-04-30' }
  ]
};
export const MissingMovementsRequest: MovementState = {
  movements: [
    { id: 1, date: '2023-01-01', label: 'Transaction A', amount: 100 },
    { id: 2, date: '2023-01-01', label: 'Transaction B', amount: 200 },
    { id: 3, date: '2023-01-01', label: 'Transaction C', amount: -80 },
    { id: 4, date: '2023-02-01', label: 'Transaction D', amount: -10 },
    { id: 5, date: '2023-02-01', label: 'Transaction E', amount: 859 },
    { id: 6, date: '2023-03-01', label: 'Transaction F', amount: 2500 },
    { id: 7, date: '2023-04-01', label: 'Transaction G', amount: -63.2 },
    { id: 8, date: '2023-05-01', label: 'Transaction H', amount: 10 }
  ],
  balances: [
    { balance: 220, date: '2023-01-31' },
    { balance: 1069, date: '2023-02-28' },
    { balance: 3569, date: '2023-03-31' },
    { balance: 3505.8, date: '2023-04-30' },
    { balance: 3555.8, date: '2023-05-31' }
  ]
};
export const MissmatchMovementsTotalRequest: MovementState = {
  movements: [
    { id: 1, date: '2023-01-01', label: 'Transaction A', amount: 100 },
    { id: 2, date: '2023-01-01', label: 'Transaction B', amount: 200 },
    { id: 3, date: '2023-01-01', label: 'Transaction C', amount: -80 },
    { id: 4, date: '2023-02-01', label: 'Transaction D', amount: -10 },
    { id: 5, date: '2023-02-01', label: 'Transaction E', amount: 859 },
    { id: 6, date: '2023-03-01', label: 'Transaction F', amount: 2500 },
    { id: 7, date: '2023-04-01', label: 'Transaction G', amount: -63.2 },
    { id: 8, date: '2023-05-01', label: 'Transaction H', amount: 50 }
  ],
  balances: [
    { balance: 220, date: '2023-01-31' },
    { balance: 1069, date: '2023-02-28' },
    { balance: 3569, date: '2023-03-31' },
    { balance: 3505.8, date: '2023-04-30' },
    { balance: 3525.8, date: '2023-05-31' }
  ]
};
export const ValidMovementsRequest: MovementState = {
  movements: [
    { id: 1, date: '2023-01-01', label: 'Transaction A', amount: 100 },
    { id: 2, date: '2023-01-01', label: 'Transaction B', amount: 200 },
    { id: 3, date: '2023-01-01', label: 'Transaction C', amount: -80 },
    { id: 4, date: '2023-02-01', label: 'Transaction D', amount: -10 },
    { id: 5, date: '2023-02-01', label: 'Transaction E', amount: 859 },
    { id: 6, date: '2023-03-01', label: 'Transaction F', amount: 2500 },
    { id: 7, date: '2023-04-01', label: 'Transaction G', amount: -63.2 },
    { id: 8, date: '2023-05-01', label: 'Transaction H', amount: 50 }
  ],
  balances: [
    { balance: 220, date: '2023-01-31' },
    { balance: 1069, date: '2023-02-28' },
    { balance: 3569, date: '2023-03-31' },
    { balance: 3505.8, date: '2023-04-30' },
    { balance: 3555.8, date: '2023-05-31' }
  ]
};

export const MovementsSampleDatasTitle: MovementsSampleDatasType[] = [
  {
    title: 'Opérations valide',
    key: 'ValidMovementsRequest'
  },
  {
    title: 'Opérations avec des doublons',
    key: 'DuplicateMovementsRequest'
  },
  {
    title: 'Points de contrôle manquant 1',
    key: 'MissingCheckpointRequest'
  },
  {
    title: 'Points de contrôle manquant 2',
    key: 'MissingCheckpointRequest2'
  },
  {
    title: 'Opérations manquante',
    key: 'MissingMovementsRequest'
  },
  {
    title: 'Différence avec le point de contrôle',
    key: 'MissmatchMovementsTotalRequest'
  }
];

export default {
  DuplicateMovementsRequest,
  MissingCheckpointRequest,
  MissingCheckpointRequest2,
  MissingMovementsRequest,
  MissmatchMovementsTotalRequest,
  ValidMovementsRequest
} as Record<string, MovementState>;
