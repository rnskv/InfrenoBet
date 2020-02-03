import PropTypes from 'prop-types';
import styled from 'styled-components';

import React, { useState } from 'react';

import Title from 'ui/atoms/Title';
import Link from 'ui/atoms/Link';
import Button from 'ui/atoms/Button';


const Container = styled.div`
    padding: 25px;
    background-color: var(--color-grey-400);
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
    
    ${Button} {
        margin: 15px;
    }
`;

const Description = styled.p`
    color: var(--color-grey);
    max-width: 420px;
    text-align: center;
`;


function AfterLogup({ reset }) {
    return (
        <Container>
            <Title>THANK YOU FOR REGISTRATION!</Title>
            <Description>
                You was register successfully!. Now, you can go to log in page and join to the game!
            </Description>
            <div>
                <Link to="/login">
                    <Button>GO TO LOG IN</Button>
                </Link>

                <Button onClick={reset}>BACK TO LOG UP</Button>
            </div>
        </Container>
    );
}

AfterLogup.propTypes = {
    reset: PropTypes.func.isRequired,
};

export default AfterLogup;
