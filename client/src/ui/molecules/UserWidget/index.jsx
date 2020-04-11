import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import deepEqual from 'deep-equal';
import { getExchangedSum } from 'src/helpers/system';
import {
    Container,
    Title,
    AvatarBlock,
    Text,
    StyledAvatar,
    TextWrapper,
    SideWrapper,
} from './styled';

function Side({
    side, avatar, name, rotate, amount, chance, title, backgroundUrl,
}) {
    return (
        <SideWrapper side={side} style={{ transform: `rotateY(${side === 'front' ? rotate : 180 - rotate}deg)` }}>
            <Title>
                {title}
            </Title>
            <AvatarBlock backgroundUrl={backgroundUrl}>
                <StyledAvatar src={avatar} />
                <span>{ name }</span>
            </AvatarBlock>
            <TextWrapper>
                <Text>
                Выигрыш:
                    <span>
                        { amount ? getExchangedSum(amount) : '???'}
                    </span>
                </Text>
                <Text>
                Шанс:
                    <span data-yellow>
                        {chance ? `${chance.toFixed(2)}%` : '???'}
                    </span>
                </Text>
            </TextWrapper>
        </SideWrapper>
    );
}

function UserWidget({ winner, backgroundUrl, title }) {
    const [rotate, setRotate] = useState(0);
    const [front, setFront] = useState(winner);
    const [back, setBack] = useState(winner);

    const RADS = {
        180: 0,
        0: 180,
    };

    function flip() {
        if (!winner._id) return;
        if (rotate === 180 && winner._id === back._id) return;
        if (rotate === 0 && winner._id === front._id) return;

        if (rotate === 0) {
            setBack(winner);
        } else {
            setFront(winner);
        }

        setRotate(RADS[rotate]);
    }

    useEffect(() => {
        flip();
    }, [winner]);

    return (
        <Container>
            <Side
                rotate={rotate}
                side="back"
                avatar={back.avatar}
                name={back.name}
                amount={back.amount}
                chance={back.chance}
                title={title}
                backgroundUrl={backgroundUrl}
            />
            <Side
                rotate={rotate}
                side="front"
                avatar={front.avatar}
                name={front.name}
                amount={front.amount}
                chance={front.chance}
                title={title}
                backgroundUrl={backgroundUrl}
            />
        </Container>
    );
}

UserWidget.propTypes = {
    winner: PropTypes.object,
    backgroundUrl: PropTypes.string,
};

UserWidget.defaultProps = {
    winner: {
        avatar: 'https://vk.com/images/camera_50.png?ava=1',
        name: '???',
        amount: '???',
        chance: '???',
    },
    backgroundUrl: '',
};

export default UserWidget;
