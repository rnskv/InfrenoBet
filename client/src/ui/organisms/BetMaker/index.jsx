import PropTypes from 'prop-types';

import React, { useState } from 'react';

import Title from 'ui/atoms/Title';
import Link from 'ui/atoms/Link';
import Close from 'ui/atoms/Close';

import BetInfo from 'ui/molecules/BetInfo';

import {
    Container,
    RightBlock,
    LeftBlock,
    StyledBetItems,
    StyledClose,
} from './styled';

function BetMaker() {
    const [isOpened, setIsOpened] = useState(true);

    return (
        <Container isOpened={isOpened}>
            <StyledClose onClick={() => setIsOpened(false)}/>
            <LeftBlock>
                <BetInfo />
                <StyledBetItems values={[10, 50, 500, 0, 0, 0, 0, 0, 0, 0]} />
            </LeftBlock>
            <RightBlock>
                <h1>Выберите монеты</h1>
                <StyledBetItems values={[1, 5, 10, 50, 100, 500, 1000, 5000]} />
            </RightBlock>
        </Container>
    );
}

BetMaker.propTypes = {

};

export default BetMaker;
