export const DuplicateMovementsRequest = {
  movements: [
    { id: 1, date: '2023-01-01', label: 'Transaction A', amount: 100 },
    { id: 2, date: '2023-02-01', label: 'Transaction B', amount: 200 },
    { id: 3, date: '2023-02-01', label: 'Transaction C', amount: -80 },
    { id: 4, date: '2023-03-01', label: 'Transaction D', amount: -10 }, // Duplicate
    { id: 7, date: '2023-03-01', label: 'Transaction D', amount: -10 }, // Duplicate
    { id: 5, date: '2023-04-01', label: 'Transaction E', amount: 859 },
    { id: 6, date: '2023-05-01', label: 'Transaction F', amount: 2500 },
  ],
  balances: [{ balance: 4, date: '2023-02-01' }],
};
