import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import BetInfo from 'ui/molecules/BetInfo';
import Inventory from 'ui/organisms/Inventory';
import SteamLinkAttacher from 'ui/organisms/SteamLinkAttacher';

import { mapDispatchToProps, mapStateToProps } from './connect';

import {
    Container,
    RightBlock,
    LeftBlock,
    StyledBetItems,
    StyledClose,
    TabTitle,
    Tabs,
} from './styled';
import { useProfile } from 'src/redux/user/hooks/selectors';

function BetMaker({
    removeItemFromBetMaker, addItemInBetMaker, isOpened, open, close, sendBet, items, userItems,
}) {
    const profile = useProfile();
    console.log('PROFILE', profile)
    const [activeTab, setActiveTab] = useState('COINS');

    const TABS = {
        SKINS: <Inventory inactivityItems={userItems} onItemClick={addItemInBetMaker} />,
        COINS: <StyledBetItems items={items} onItemClick={addItemInBetMaker} />,
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
                <SteamLinkAttacher
                    isVisible={activeTab === 'SKINS' && (!profile.steamTradeUrl || !profile.steamId)}
                />
            </LeftBlock>
            <RightBlock>
                <Tabs>
                    <TabTitle
                        isActive={activeTab === 'COINS'}
                        onClick={() => setActiveTab('COINS')}
                    >
                        Монеты
                    </TabTitle>
                    <TabTitle
                        isActive={activeTab === 'SKINS'}
                        onClick={() => setActiveTab('SKINS')}
                    >
                        Скины
                    </TabTitle>
                </Tabs>
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
