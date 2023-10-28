export const ValidMovementsRequest = {
  movements: [
    { id: 1, date: '2023-01-01', label: 'Transaction A', amount: 100 },
    { id: 2, date: '2023-01-01', label: 'Transaction B', amount: 200 },
    { id: 3, date: '2023-01-01', label: 'Transaction C', amount: -80 },
    { id: 4, date: '2023-02-01', label: 'Transaction D', amount: -10 },
    { id: 5, date: '2023-02-01', label: 'Transaction E', amount: 859 },
    { id: 6, date: '2023-03-01', label: 'Transaction F', amount: 2500 },
    { id: 7, date: '2023-04-01', label: 'Transaction G', amount: -63.2 },
    { id: 8, date: '2023-05-01', label: 'Transaction G', amount: 50 },
  ],
  balances: [
    { balance: 220, date: '2023-01-31' },
    { balance: 1069, date: '2023-02-28' },
    { balance: 3569, date: '2023-03-31' },
    { balance: 3505.8, date: '2023-04-30' },
    { balance: 3555.8, date: '2023-05-31' },
  ],
};
