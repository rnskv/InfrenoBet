import PropTypes from 'prop-types';

import React from 'react';

import { getExchangedSum } from 'src/helpers/system';

import {
    Container,
    Description,
    Item,
    StyledAvatar,
    Tickets
} from './styled';

function Bet({
    user, ticketFrom, ticketTo, item,
}) {
    console.log(item)
    return (
        <Container>
            <StyledAvatar src={user.avatar} />
            <Description>
                <div>
                    {`${user.name} вложил монету ( ${getExchangedSum(item.cost)} )` }
                </div>
                <div>
                    <b>
                        {`Билеты: от ${ticketFrom} до ${ticketTo}`}
                    </b>
                </div>
            </Description>
            <Item>
                <img src={item.image} />
                <Tickets>
                    <span>{`+${ticketTo - ticketFrom + 1}`}</span>
                </Tickets>
            </Item>
        </Container>
    );
}

Bet.propTypes = {
};

export default Bet;
