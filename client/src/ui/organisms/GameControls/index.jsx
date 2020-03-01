import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Input from 'ui/atoms/Input';

import UserBank from 'ui/molecules/UserBank';
import WinInfo from 'ui/organisms/WinInfo';

import {
    Container,
    ItemsCount,
    Information,
    Description,
    SplitArrow,
    Chance,
    More,
    StyledButton as Button,
} from './styled';

function GameControls({ percent, itemsCount, openBetMaker }) {
    return (
        <Container>
            <ItemsCount>
                <Information>
                    Вы вложили в игру - {itemsCount} из 10 монет.
                </Information>
                <Description>
                    Мин.ставка 1₽, максимум предметов 10.
                    Чем выше ставка, тем больше шанс победить.
                    <More>Подробнее</More>
                </Description>
            </ItemsCount>
            <SplitArrow />
            <Chance>
                Шанс:
                <span>{percent.toFixed(2)}%</span>
            </Chance>
            <Button onClick={openBetMaker}>Сделать ставку</Button>
        </Container>
    );
}

GameControls.propTypes = {
    percent: PropTypes.number,
    itemsCount: PropTypes.number,
};

GameControls.defaultProps = {
    percent: 0,
    itemsCount: 0,
};

export default GameControls;
