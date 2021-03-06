import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { Transition } from 'react-transition-group';

import { useProfile } from 'src/redux/user/hooks/selectors';

import { openAuthSteamWindow } from 'src/helpers/auth';
import Input from 'ui/atoms/Input';
import { infernoClient } from 'src/index';
import { useNotificationActions } from 'src/redux/user/hooks/actions';
import { STEAM_TRADE_URL_CHANGED } from 'shared/configs/notificationsTypes';
import {
    Container,
    SteamSocialButton,
    Accounts,
    TradeLinks,
    ConfirmButton,
    TradeUrl,
    Url
} from './styled';
import NotAccessPlaceholder from 'ui/organisms/NotAccessPlaceholder';

function SocialLinks() {
    const [isLoading, setIsLoading] = useState(false);
    const notificationActions = useNotificationActions();
    const tradeLinkInputRef = useRef(null);

    const profile = useSelector((state) => state.user.profile, shallowEqual);

    const onConfirmSteamTradeLink = () => {
        setIsLoading(true);
        infernoClient.modules.api.services.user.execute('updateSteamTradeLink', {
            body: {
                url: tradeLinkInputRef.current.value,
            },
        }).then(() => {
            notificationActions.addNotification({ type: STEAM_TRADE_URL_CHANGED });
        }).finally(() => {
            setIsLoading(false);
        });
    };

    useEffect(() => {
        tradeLinkInputRef.current.value = profile.steamTradeUrl || '';
    }, [profile]);

    return (
        <Container>
            <Accounts>
                <h3>Cоциальные аккаунты:</h3>
                <SteamSocialButton
                    onClick={openAuthSteamWindow}
                    disabled={profile.steamId}
                >
                    Steam
                </SteamSocialButton>
            </Accounts>
            <TradeLinks>
                <h3>Необходимые ссылки:</h3>
                <Url>
                    <NotAccessPlaceholder isVisible={!profile.steamId}/>
                    <Input
                        ref={tradeLinkInputRef}
                        before={
                            <TradeUrl href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url" target="_blank">TRADE</TradeUrl>
                        }
                        after={(
                            <ConfirmButton
                                onClick={onConfirmSteamTradeLink}
                                isLoading={isLoading}
                            >
                                Сохранить
                            </ConfirmButton>
                        )}
                        placeholder="Например: https://steamcommunity.com/tradeoffer/new/?partner=879013079&token=EuZ8DXXX"
                        // description={'С помощью этой ссылки наш бот сможет отправлять вам предметы из вашего инвентаря INFERNO.BET в ваш инвентарь STEAM'}
                        maskType={null}
                    />
                </Url>
            </TradeLinks>
        </Container>
    );
}

SocialLinks.propTypes = {
    children: PropTypes.node,
};

SocialLinks.defaultProps = {
    isVisible: false,
};

export default SocialLinks;
