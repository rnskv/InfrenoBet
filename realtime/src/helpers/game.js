export function getTransactionsValue(transactions) {
    return transactions.reduce((acc,transaction) => {
        return acc + transaction.value;
    }, 0);
}

export function getTransactionValue(transaction) {
    return transaction.values.reduce((acc, value) => {
        return acc + value;
    }, 0);
}
