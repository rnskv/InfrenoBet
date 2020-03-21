import PropTypes from 'prop-types';

import React, { useRef, useState, useEffect } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import Bet from 'ui/molecules/Bet';

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

function BetsContainer({ bets, isGameEnd }) {
    const prevBets = usePrevious(bets) || [];
    console.log(bets);
    return (
        <Container>
            <Wrapper
                key={bets.length}
                betsCount={Math.abs(bets.length - prevBets.length)}
                totalBetsCount={bets.length}
                isGameEnd={isGameEnd}
            >
                {
                    (bets || prevBets).reverse().map((bet, index) => (
                        <Bet
                            key={`${bet.ticketTo}`}
                            index={index}
                            user={bet.user}
                            item={bet.item}
                            ticketFrom={bet.ticketFrom}
                            ticketTo={bet.ticketTo}
                        />
                    ))
                }
            </Wrapper>
        </Container>
    );
}

BetsContainer.propTypes = {
};

export default React.memo(BetsContainer);
