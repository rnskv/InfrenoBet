import PropTypes from 'prop-types';

import React from 'react';
import Svg from 'svg-inline-react';
import vkSVG from 'src/resources/svg/vkontakte-icon.svg';

import {
    Container,
    Icon
} from './styled';

function SocialNetworks({
}) {
    return (
        <Container>
            <Icon>
                <Svg src={vkSVG} />
            </Icon>
        </Container>
    );
}

SocialNetworks.propTypes = {
};

export default SocialNetworks;
