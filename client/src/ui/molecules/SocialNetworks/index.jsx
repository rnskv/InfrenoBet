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
            <a href="https://vk.com/infernobet_official" target="_blank">
                <Icon>
                    <Svg src={vkSVG} />
                </Icon>
            </a>
        </Container>
    );
}

SocialNetworks.propTypes = {
};

export default SocialNetworks;
