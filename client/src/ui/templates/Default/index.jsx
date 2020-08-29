import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Navigation from 'ui/organisms/Navigation';
import Sidebar from 'ui/organisms/Sidebar';
import Header from 'ui/organisms/Header';

import SidebarNotifications from 'ui/molecules/SidebarNotifications';
import SidebarNavigation from 'ui/molecules/SidebarNavigation';
import SidebarProfile from 'ui/molecules/SidebarProfile';
import LoginPopup from 'ui/organisms/LoginPopup';
import SidebarCompact from 'ui/molecules/SidebarCompact';

import media from 'src/helpers/media';
import { useSidebar } from 'src/redux/user/hooks/selectors';
import OnlineUsers from 'ui/molecules/OnlineUsers';
import SocialNetworks from 'ui/molecules/SocialNetworks';
import PageFooter from 'ui/molecules/PageFooter';
import { useServices } from 'src/helpers/hooks';
import { useProfile } from 'src/redux/user/hooks/selectors';
import { useNotificationActions, userProfileActions } from 'src/redux/user/hooks/actions';
import Button from 'ui/atoms/Button';
import { useAuth } from 'src/helpers/hooks';

const Bonus = styled.div`
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;;
    color: var(--color-white);
    flex-wrap: wrap;
    box-shadow: 0 0 9px 0px #0e1014;
    background: var(--color-grey-500);
`;

const TakeBonusButton = styled(Button)`
    min-width: 130px;
`;

const FreeTournament = styled.div`
    padding: 10px 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    color: #272727;
    border-radius: 5px;
    box-shadow: 0 0 9px 0px #0e1014;
    background: url(/dist/resources/images/free.jpg) black;
    height: 230px;
    background-size: cover;
    background-repeat: no-repeat;

    b {
        color: var(--color-yellow);
        text-shadow: 1px 1px #00000061;
    }

    p {
        font-size: 18px;
        color: #fff;
        width: 85%;
        line-height: 28px;
    }

    h1 {
        text-align: left;
        width: 100%;
        color: #fff;
        text-shadow: 0px 1px 1px black;
        font-size: 35px;
    }
`
    
const Content = styled.div`
    margin: 25px auto 0;
    background: var(--color-grey-500);
    box-sizing: border-box;
    width: 900px;
    color: var(--color-grey);
    border-radius: 4px;
    box-shadow: 0px 0px 3px 0px var(--color-shadow);
    align-self: flex-start;
    overflow: hidden;
    ${media.tablet`
        width: 100%;
    `}
`;

const PrevContent = styled.div`
    margin-top: ${({ isNeedMargin }) => (isNeedMargin ? '25px' : 0)};
    width: 900px;
    ${media.tablet`
    width: 100%;
  `}
`;

const Page = styled.div`
    display: flex;
    margin-top: calc(var(--header-height));
    margin-bottom: 75px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const Vertical = styled.div``;

const Beta = styled.div`
    line-height: 28px;
    b {
        color: var(--color-yellow);
        font-size: 22px;
        padding: 5px 10px;
        background-color: var(--color-grey-500);
        border-radius: 5px;
        margin: 0 10px 0 0;
    }

    a {
        color: var(--color-blue);
    }

    font-size: 15px;
    color: rgba(255, 255, 255, 0.6);
    padding: 25px;
    background: var(--color-grey-400);
`;

const SIDEBAR_TABS = {
    NOTIFICATIONS: <SidebarNotifications />,
    CHAT: (
        <div
            style={{
                color: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
            }}
        >
            В разработке
        </div>
    ),
};

function TakeBonus() {
    const [pending, setPending] = useState(false);
    const [now, setNow] = useState(Date.now())
    const services = useServices();
    const profile = useProfile();
    const notificationActions = useNotificationActions();
    const profileActions = userProfileActions();
    const isAuth = useAuth();
    const canTakeEvery = 60 * 1000;

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => clearInterval(interval)
    }, []);

    const takeBonus = async () => {
        setPending(true);
        services.user.execute('takeBonus').then(async () => {
            notificationActions.addNotification({ type: 'USER_BONUS_TAKEN' });
            await profileActions.getProfile();
        }).finally(() => {
            setPending(false);
        })
    }

    const time = (new Date(now).getTime() - new Date(profile.takedBonusDate).getTime());
    const timeLeft = time > canTakeEvery ? 0 : Math.floor((canTakeEvery - time) / 1000);
    return (
        isAuth ? <Bonus>  
            <p>{ timeLeft > 0 ? <div>Следующий бесплатный бонус можно забрать через: {timeLeft} секунд! </div> : <div>Вам доступен бесплатный бонус! Он мгновенно начислится на Ваш баланс!</div> }</p> 
            <TakeBonusButton isLoading={pending} disabled={timeLeft > 0} onClick={takeBonus}>Забрать бонус!</TakeBonusButton>
        </Bonus> : null
    )
}
function Default({
    children, widgets, prevContent, ...props
}) {
    const sidebarData = useSidebar();
    const isAuth = useAuth();
    
    return (
        <div {...props}>
            <Header />
            <LoginPopup />
            <Wrapper>
            
                <Page>
                    <Sidebar
                        params={{
                            side: 'left',
                        }}
                    >
                        <Navigation />
                        <OnlineUsers />
                        <SocialNetworks />
                    </Sidebar>
                    <Wrapper>
                        <Vertical>
                            {/* <PrevContent isNeedMargin>*/}
                            {/*    <Beta>*/}
                            {/*        <b>BETA</b>*/}
                            {/*        Ключевые функции уже доступны, и нам нужны тестировщики*/}
                            {/*        которые помогут выявить слабые места уже сейчас,*/}
                            {/*        чтобы мы смогли улучшить игровой опыт участников перед релизом.*/}
                            {/*        Связь с разработчиками*/}
                            {/*        {' '}*/}
                            {/*        <a target="_blank" href="https://vk.com/board128633025">здесь</a>*/}
                            {/*        <br />*/}
                            {/*        Сразу после регистрация вам на баланс*/}
                            {/*        будет зачисленна сумма размером в 1 ставку.*/}
                            {/*    </Beta>*/}
                            {/*</PrevContent> */}
                            <PrevContent isNeedMargin>
                                <FreeTournament>
                                <h1>Бесплатный турнир!</h1>
                                <p>
                                    Играй бесплатно и получай реальные деньги!<br/>
                                    До <b>01.01.2021</b>, каждую неделю, <br/>все игроки,
                                    попавшие в <b>ТОП-3</b> игроков недели, <br/>
                                    получат подарок - до <b>1000</b> рублей</p>
                                </FreeTournament>
                            </PrevContent>   
                            <PrevContent isNeedMargin>
                                <TakeBonus/>
                            </PrevContent>
                            { isAuth && <PrevContent isNeedMargin>
                                <a target="__blank" href="https://trafoff.com/13775/1?l=1" title="">
                                    <img 
                                        src="https://vlkpcdn.com/public/banners/5/e/5e95f453046d6b94270b642bba3be8bd.gif"
                                        width="100%"
                                        height="auto"
                                        alt=""   
                                    />
                                </a>
                            </PrevContent> }
                            <PrevContent isNeedMargin={!!prevContent.length}>
                                {prevContent}
                            </PrevContent>
                            <Content>{children}</Content>
                            <PageFooter />
                        </Vertical>
                        {widgets}
                    </Wrapper>
                    <Sidebar
                        params={{
                            side: 'right',
                        }}
                    >
                        <SidebarProfile />
                        <SidebarNavigation />
                        {SIDEBAR_TABS[sidebarData.activeTabName]}
                    </Sidebar>
                    <SidebarCompact />
                </Page>
            </Wrapper>
        </div>
    );
}

Default.propTypes = {
    children: PropTypes.node.isRequired,
    widgets: PropTypes.array,
    prevContent: PropTypes.array,
};

Default.defaultProps = {
    widgets: [],
    prevContent: [],
};

export default React.memo(Default, () => false);
