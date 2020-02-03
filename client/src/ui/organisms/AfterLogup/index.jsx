import PropTypes from 'prop-types';

import React from 'react';

import Title from 'ui/atoms/Title';
import Link from 'ui/atoms/Link';
import Button from 'ui/atoms/Button';

import {
    Container,
    Description,
} from './styled';

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
