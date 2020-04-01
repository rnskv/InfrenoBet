import PropTypes from 'prop-types';

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'ui/atoms/Loader';
import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import { useShallowEqualSelector } from 'src/helpers/hooks';
import BetItem from 'ui/atoms/BetItem';
import { RightBlock, StyledBetItems } from 'ui/organisms/BetMaker/styled';
import LogupForm from '../LogupForm';
import {
    Container,
    StyledForm,
    Label,
    Name,
    StyledButton,
} from './styled';

function Inventory({ onItemClick, inactivityItems }) {
    const profile = useSelector((state) => state.user.profile);

    if (profile.isLoading) {
        return <Loader />;
    }

    return (
        <Container>
            <StyledBetItems
                onItemClick={onItemClick}
                items={profile.inventory}
                inactivityItems={inactivityItems}
                useExtendedView
            />
        </Container>
    );
}

Inventory.propTypes = {
    inactivityItems: PropTypes.array
};

Inventory.defaultProps = {
};

export default Inventory;
