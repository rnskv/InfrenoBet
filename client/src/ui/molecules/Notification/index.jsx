import { string, object, number } from 'prop-types';
import React from 'react';
import dateFormat from 'dateformat';

import {
    Container,
    Title,
    Text,
    Date as DateComponent,
    Icon,
    Content,
} from './styled';
import { NavigationIcon } from '../../organisms/Navigation/styled';

const MOCK_ICONS = {
    ERROR: 'https://banner2.cleanpng.com/20180320/btw/kisspng-area-trademark-symbol-brand-sign-error-5ab0d7e1e44023.2850921615215390419349.jpg',
    SUCCESS: 'https://sun9-12.userapi.com/c206516/v206516687/49d7a/c7wnfazUB98.jpg?ava=1',
};

function Notification({
    type, title, text, date, className, style,
}) {
    const svgId = type === 'ERROR' ? 'notification-error' : 'notification-success';
    console.log('why render??');
    return (
        <Container className={className} style={style} type={type}>
            <Icon src={MOCK_ICONS[type]}>
                <svg>
                    <use xlinkHref={`#${svgId}`} />
                </svg>
            </Icon>

            <Content>
                <Title>{ title }</Title>
                <Text>{ text }</Text>
                <DateComponent>{ dateFormat(date, 'HH:MM:ss') }</DateComponent>
            </Content>
        </Container>
    );
}

Notification.propTypes = {
    title: string.isRequired,
    text: string.isRequired,
    type: string,
    date: number,
    className: string,
    style: object,
};

Notification.defaultProps = {
    type: 'ERROR',
    date: Date.now(),
    className: '',
    style: {},
};

export default React.memo(Notification, (prevProps, nextProps) => prevProps.text === nextProps.text);
