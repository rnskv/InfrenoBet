import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import UserWidget from 'ui/molecules/UserWidget';
import { getGameBank } from 'shared/helpers/game';
import { getUniqueObjectsInArray } from 'shared/helpers/system';
import { useGreatestWinner, useLastWinner, useLuckyWinner } from 'src/redux/game/hooks/selectors';
import { Container, StyledCheckbox } from './styled';

function GameWidgets() {
    const lastWinner = useLastWinner();
    const luckyWinner = useLuckyWinner();
    const greatestWinner = useGreatestWinner();

    return (
        <Container>
            <UserWidget
                title="Последний победитель"
                winner={lastWinner}
            />
            <UserWidget
                title="Счастливчик дня"
                winner={luckyWinner}
                backgroundUrl="/dist/resources/images/lucky-bg.png"
            />
            <UserWidget
                title="Победитель дня"
                winner={greatestWinner}
                backgroundUrl="/dist/resources/images/dollars-widget.png"
            />
        </Container>
    );
}

GameWidgets.propTypes = {
};

GameWidgets.defaultProps = {
};

export default GameWidgets;
