import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import moment from 'moment';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import Link from 'ui/atoms/Link';
import Svg from 'svg-inline-react';
import ModuleLoader from 'ui/atoms/ModuleLoader';

import { useProfile } from 'src/redux/user/hooks/selectors';
import Avatar from 'ui/atoms/Avatar';
import {
    Container,
    Counter,
    Users,
    User,
    Name,
    Wrapper,
} from './styled';

function ReferralLevel({ totalCount, users }) {
    const profile = useProfile();

    return (
        <Container>
            <Users>
                <Wrapper>
                    <p>
                        {'Пользователи, которые зарегистрировались по вашей партнёрской ссылке или активировали ваш партнёрский код становятся вашими рефералами. Вы получаете'}
                        <b>
                            { ` ${profile.referralShare * 100 }% `}
                        </b>
                        {'с комиссии каждой выигранной ими игры.'}
                    </p>
                </Wrapper>
                <Wrapper>
                    { !users.length && <h3>Здесь будут показаны 3 ваших последних реферала</h3>}
                    { users.map(({ avatar, name }) => (
                        <User>
                            <Avatar src={avatar} />
                            <Name>{ name }</Name>
                        </User>
                    ))}
                    <Counter>
                        Всего приведено пользователей:
                        <span>{ totalCount }</span>
                    </Counter>
                </Wrapper>
            </Users>
        </Container>

    );
}

ReferralLevel.propTypes = {
    totalCount: PropTypes.number,
    users: PropTypes.array,
};

ReferralLevel.defaultProps = {
    totalCount: 0,
    users: [],
};

export default ReferralLevel;
