import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import UserBank from 'ui/molecules/UserBank';

import {
    Container,
} from './styled';

function UsersBanks({ users, bank }) {
    return (
        <Container>
            {
                users.map((user, index) => (
                    <UserBank
                        key={user._id}
                        user={user}
                        bank={bank}
                    />
                ))
            }
        </Container>
    )
}

UsersBanks.propTypes = {
};

export default UsersBanks;
