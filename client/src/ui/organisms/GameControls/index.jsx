import PropTypes from 'prop-types';

import React from 'react';
import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';
import { getExchangedSum } from 'src/helpers/system';

import { useSelector } from 'react-redux';

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


function GameControls({
    percent, itemsCount, openBetMaker, isVisible, isAuth
}) {
    if (!isVisible) return null;

    return (
        <Container>
            <NotAuthPlaceHolder isVisible={!isAuth} />
            <ItemsCount>
                <Information>
                    {`Вы вложили в игру - ${itemsCount} из 10 монет.`}
                </Information>
                <Description>
                    {`Мин.ставка ${getExchangedSum(0.013)}, максимум предметов 10.
                    Чем выше ставка, тем больше шанс победить.`}
                    <More>Подробнее</More>
                </Description>
            </ItemsCount>
            <SplitArrow />
            <Chance>
                Шанс:
                <span>
                    {`${percent.toFixed(2)}%`}
                </span>
            </Chance>
            <Button onClick={openBetMaker}>Сделать ставку</Button>
        </Container>
    );
}

GameControls.propTypes = {
    openBetMaker: PropTypes.func.isRequired,
    percent: PropTypes.number,
    itemsCount: PropTypes.number,
    isVisible: PropTypes.bool,
    isAuth: PropTypes.bool,
};

GameControls.defaultProps = {
    percent: 0,
    itemsCount: 0,
    isVisible: false,
    isAuth: false,
};

export default GameControls;
