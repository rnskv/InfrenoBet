import PropTypes from 'prop-types';

import React from 'react';

import Avatar from 'ui/atoms/Avatar';

import {
    Container,
    Description,
    Item,
} from './styled';

function Bet({
    user, ticketFrom, ticketTo, item,
}) {
    console.log(item)
    return (
        <Container>
            <Avatar src={user.avatar} />
            <Description>
                <div>
                    {`Игрок ${user.name} сделал ставку на сумму ${item.cost}₽` }
                </div>
                <div>
                    <b>
                        {`Билеты: от ${ticketFrom} до ${ticketTo} (+${ticketTo - ticketFrom + 1} билетов)`}
                    </b>
                </div>
            </Description>
            <Item>
                <img src={item.image} />
            </Item>
        </Container>
    );
}

Bet.propTypes = {
};

export default Bet;
