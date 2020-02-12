import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
    Title,
    Text,
    Date,
    Icon,
    Content,
} from './styled';

function Notification({ title, text, date, className, style }) {
    return (
        <Container className={className} style={style}>
            <Icon src="https://banner2.cleanpng.com/20180320/btw/kisspng-area-trademark-symbol-brand-sign-error-5ab0d7e1e44023.2850921615215390419349.jpg"/>
            <Content>
                <Title>{ title }</Title>
                <Text>{ text }</Text>
                <Date>{ date }</Date>
            </Content>
        </Container>
    );
}

Notification.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Notification;
