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

function BetMaker({
    removeItemFromBetMaker, addItemInBetMaker, isOpened, open, close, sendBet, items, userItems,
}) {
    return (
        <Container isOpened={isOpened}>
            <StyledClose onClick={close} />
            <LeftBlock>
                <BetInfo
                    userItems={userItems}
                    sendBet={sendBet}
                />
                <StyledBetItems
                    items={[...userItems, 0, 0, 0, 0, 0, 0, 0, 0].slice(0, 8)}
                    onItemClick={removeItemFromBetMaker}
                />
            </LeftBlock>
            <RightBlock>
                <h1>Выберите монеты</h1>
                <StyledBetItems items={items} onItemClick={addItemInBetMaker} />
            </RightBlock>
        </Container>
    );
}

BetMaker.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BetMaker);
