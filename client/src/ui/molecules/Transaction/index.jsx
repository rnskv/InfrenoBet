import PropTypes from 'prop-types';

import React from 'react';

import Avatar from 'ui/atoms/Avatar';

import {
    Container,
    Description,
    Item,
} from './styled';

function Transaction({
    user, value, ticketFrom, ticketTo,
}) {
    return (
        <Container>
            <Avatar src={user.avatar} />
            <Description>
                <div>
                    Игрок { user.name } сделал ставку на сумму {value}₽
                </div>
                <div>
                    <b>
                        {`Билеты: от ${ticketFrom} до ${ticketTo} (+${ticketTo - ticketFrom + 1} билетов)`}
                    </b>
                </div>
            </Description>
            <Item>
                <img src="https://d2lomvz2jrw9ac.cloudfront.net/common/currency/2500.png" />
            </Item>
        </Container>
    );
}

Transaction.propTypes = {
};

export default Transaction;
