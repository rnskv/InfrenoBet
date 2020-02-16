import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import BetInfo from 'ui/molecules/BetInfo';

import { mapDispatchToProps, mapStateToProps } from './connect';

import {
    Container,
    RightBlock,
    LeftBlock,
    StyledBetItems,
    StyledClose,
} from './styled';

function BetMaker({ removeBetFromBetMaker, addBetInBetMaker, isOpened, open, close, sendTransaction, allValues, userValues}) {
    return (
        <Container isOpened={isOpened}>
            <StyledClose onClick={close}/>
            <LeftBlock>
                <BetInfo
                    userValues={userValues}
                    sendTransaction={sendTransaction}
                />
                <StyledBetItems
                    values={[...userValues, 0, 0, 0, 0, 0, 0, 0, 0].slice(0, 8)}
                    onItemClick={removeBetFromBetMaker}
                />
            </LeftBlock>
            <RightBlock>
                <h1>Выберите монеты</h1>
                <StyledBetItems values={allValues} onItemClick={addBetInBetMaker} />
            </RightBlock>
        </Container>
    );
}

BetMaker.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BetMaker);
