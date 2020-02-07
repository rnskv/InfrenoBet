import PropTypes from 'prop-types';

import React from 'react';

import Title from 'ui/atoms/Title';
import Link from 'ui/atoms/Link';
import Button from 'ui/atoms/Button';

import {
    Container,
    Avatar,
    Description,
    Item,
    TextAvatar,
} from './styled';

function Transaction({
    user, value, ticketFrom, ticketTo,
}) {
    return (
        <Container>
            {
                user.avatar
                    ? <Avatar src="https://de4khei8i4ut2.cloudfront.net/avatar/csgofast_04j7knMRKp.png?t=1567633704712&width=80&height=80" />
                    : (
                        <TextAvatar>
                            { user.name[0] }
                        </TextAvatar>
                    )
            }
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
