import PropTypes from 'prop-types';

import React, { useRef, useState, useEffect } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import Transaction from 'ui/molecules/Transaction';

import {
    Wrapper,
    Container,
} from './styled';

function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef(null);

    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

function TransactionsContainer({ transactions, isGameEnd }) {
    const prevTransactions = usePrevious(transactions) || [];

    return (
        <Container>
            <Wrapper
                key={transactions.length}
                transactionsCount={Math.abs(transactions.length - prevTransactions.length)}
                totalTransactionsCount={transactions.length}
                isGameEnd={isGameEnd}
            >
                {
                    (transactions || prevTransactions).map((transaction, index) => (
                        <Transaction
                            key={`${transaction.ticketTo}`}
                            index={index}
                            user={transaction.user}
                            value={transaction.value}
                            ticketFrom={transaction.ticketFrom}
                            ticketTo={transaction.ticketTo}
                        />
                    ))
                }
            </Wrapper>
        </Container>
    );
}

TransactionsContainer.propTypes = {
};

export default React.memo(TransactionsContainer);
