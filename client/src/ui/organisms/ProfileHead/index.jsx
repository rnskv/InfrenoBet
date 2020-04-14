import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import Link from 'ui/atoms/Link';
import Svg from 'svg-inline-react';

import {
    Container,
} from './styled';
import { NavigationIcon } from '../Navigation/styled';

function ProfileHead({}) {
    return (
        <Container>
           Бошка профиля
        </Container>

    );
}

ProfileHead.propTypes = {

};

ProfileHead.defaultProps = {

};

export default ProfileHead;
