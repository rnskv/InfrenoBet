import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Balance from 'ui/molecules/Balance';

import { mapDispatchToProps, mapStateToProps } from './connect';

import {
    Container,
} from './styled';

function BetMaker({
    profile,
}) {
    return (
        <Container>
           Header
            <Balance value={profile.balance} />
        </Container>
    );
}

BetMaker.propTypes = {
    profile: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(BetMaker);
