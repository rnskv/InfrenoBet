import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import moment from 'moment';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import Link from 'ui/atoms/Link';
import Svg from 'svg-inline-react';

import { useProfile } from 'src/redux/user/hooks/selectors';
import { getExchangedSum } from 'src/helpers/system';
import { useReferralsActions, useReferralsDomains } from 'src/redux/referrals/hooks/actions';
import { useReferralsLoaders, useReferralsStatistics } from 'src/redux/referrals/hooks/selectors';
import {
    Container,
    Counter,
} from './styled';


function ReferralBalance({ amount }) {
    const domains = useReferralsDomains();
    const loaders = useReferralsLoaders();

    return (
        <Container>
            <span>
                    Твой текущий заработок
            </span>
            <b>
                { getExchangedSum(amount) }
            </b>
            <Button
                onClick={domains.cashOut}
                isLoading={loaders.cashOutIsLoading}
                disabled={amount <= 0}
            >
                ЗАБРАТЬ
            </Button>
        </Container>

    );
}

ReferralBalance.propTypes = {
    amount: PropTypes.number,
};

ReferralBalance.defaultProps = {
    amount: 0,
};

export default ReferralBalance;
