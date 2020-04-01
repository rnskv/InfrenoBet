import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import BetInfo from 'ui/molecules/BetInfo';
import Inventory from 'ui/organisms/Inventory';

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

    const [activeTab, setActiveTab] = useState('COINS');

    const TABS = {
        'SKINS': <Inventory inactivityItems={userItems} onItemClick={addItemInBetMaker} />,
        'COINS': <StyledBetItems items={items} onItemClick={addItemInBetMaker} />,
    };

    return (
        <Container isOpened={isOpened}>
            <StyledClose onClick={close} />
            <LeftBlock>
                <BetInfo
                    userItems={userItems}
                    sendBet={sendBet}
                />
                <StyledBetItems
                    items={userItems}
                    onItemClick={removeItemFromBetMaker}
                />
            </LeftBlock>
            <RightBlock>
                <h1>Выберите монеты</h1>
                <button onClick={() => setActiveTab('COINS')}>Монеты</button>
                <button onClick={() => setActiveTab('SKINS')}>Скины</button>

                {
                    TABS[activeTab]
                }

            </RightBlock>
        </Container>
    );
}

BetMaker.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BetMaker);
