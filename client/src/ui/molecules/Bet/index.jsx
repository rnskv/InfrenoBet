import PropTypes from 'prop-types';

import React from 'react';

import { getExchangedSum } from 'src/helpers/system';

import {
    Container,
    Description,
    Item,
    StyledAvatar,
    Tickets,
} from './styled';

function Bet({
    user, ticketFrom, ticketTo, item,
}) {
    return (
        <Container>
            <StyledAvatar src={user.avatar} experience={user.experience}/>
            <Description>
                <div>
                    {`${user.name} вложил
                    ${item.parent.type === 0 ? 'монету' : item.parent.name }
                    ( ${getExchangedSum(item.parent.cost)} )` }
                </div>
                <div>
                    <b>
                        {`Билеты: от #${ticketFrom} до #${ticketTo}`}
                    </b>
                </div>
            </Description>
            <Item>
                <img src={item.parent.image} />
                <Tickets>
                    <span>{`+${(ticketTo - ticketFrom + 1)}`}</span>
                </Tickets>
            </Item>
        </Container>
    );
}

Bet.propTypes = {
};

export default Bet;
