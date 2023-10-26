export const DuplicateMovementsRequest = {
  movements: [
    { id: 1, date: '2023-01-01', wording: 'Transaction A', amount: 100 },
    { id: 2, date: '2023-02-01', wording: 'Transaction B', amount: 200 },
    { id: 3, date: '2023-02-01', wording: 'Transaction C', amount: -80 },
    { id: 4, date: '2023-03-01', wording: 'Transaction D', amount: -10 }, // Duplicate
    { id: 7, date: '2023-03-01', wording: 'Transaction D', amount: -10 }, // Duplicate
    { id: 5, date: '2023-04-01', wording: 'Transaction E', amount: 859 },
    { id: 6, date: '2023-05-01', wording: 'Transaction F', amount: 2500 },
  ],
  balances: [{ balance: 4, date: '2023-02-01' }],
};
