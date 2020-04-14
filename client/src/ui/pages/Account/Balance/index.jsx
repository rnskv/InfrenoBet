import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import DefaultTemplate from 'ui/templates/Default';
import Tabs from 'ui/molecules/Tabs';
import { useProfile } from 'src/redux/user/hooks/selectors';
import ProfileHead from 'ui/organisms/ProfileHead';
import TABS from 'src/configs/account-tabs';
import { getExchangedSum } from 'src/helpers/system';
import Button from 'ui/atoms/Button';
import Link from 'ui/atoms/Link';

const BalanceContainer = styled.div`
  border-left: 2px solid var(--color-white);
  padding: 25px 15px;
  margin: 25px;
  display: flex;
  background-color: var(--color-grey-400);
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  
  button {
     width: 130px;
  }
`;

const BalanceBlock = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  
  span {
    font-size: 32px;
    color: var(--color-white);
  }
`;

function Balance() {
    const profile = useProfile();

    return (
        <DefaultTemplate prevContent={[<ProfileHead />]}>
            <Tabs
                tabs={TABS}
            />
            <BalanceContainer>
                <BalanceBlock>
                    Баланс:
                    <span>{ getExchangedSum(profile.balance) }</span>
                </BalanceBlock>
                <Link to="/withdraw">
                    <Button type="transparent">Вывод</Button>
                </Link>
            </BalanceContainer>
        </DefaultTemplate>
    );
}

Balance.propTypes = {
};

Balance.defaultProps = {
};

export default Balance;
