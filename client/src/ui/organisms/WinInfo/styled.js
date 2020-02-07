import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import CommonTitle from 'ui/atoms/Title';

import AuthenticationForm from 'ui/molecules/AuthenticationForm';

export const Container = styled.div`
    background: var(--color-blue);
    width: 100%;
`;

export const WinnerTicket = styled.div`
  color: var(--color-black);
  span {
    color: var(--color-white);
  }
`;

export const WinnerName = styled.div`
  color: var(--color-black);
  span {
    color: var(--color-yellow);
  }
`;

export const Winner = styled.div`
  padding: 20px 0;
  font-weight: 500;
  font-size: 20px;
`;
