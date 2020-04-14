import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import Link from 'ui/atoms/Link';
import Svg from 'svg-inline-react';

import { useProfile } from 'src/redux/user/hooks/selectors';
import {
    Container,
    AvatarBlock, StyledAvatar, InformationBlock, Name, Stats, Status
} from './styled';


function ProfileHead({}) {
    const profile = useProfile();

    return (
        <Container>
            <AvatarBlock>
                <StyledAvatar src={profile.avatar} />
            </AvatarBlock>
            <InformationBlock>
                <Name>
                    <span>{ profile.name }</span>
                    <Status>Обычный аккаунт</Status>
                </Name>

                <Stats>
                    <span>
                        Дата регистрации:
                        <b>{ profile.createDate }</b>
                    </span>
                    <span>
                        Inferno ID:
                        <b>{ profile._id }</b>
                    </span>
                </Stats>
            </InformationBlock>
        </Container>

    );
}

ProfileHead.propTypes = {

};

ProfileHead.defaultProps = {

};

export default ProfileHead;
