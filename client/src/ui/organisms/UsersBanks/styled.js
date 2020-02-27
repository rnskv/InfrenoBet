import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import AuthenticationForm from 'ui/molecules/AuthenticationForm';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    background: var(--color-grey-800);
    position: relative;
    flex-direction: column;
`;

export const ChancesBar = styled.div`
  width: 100%;
  height: 5px;
  background: var(--color-black);
  position: relative;
  display: flex;
`;

export const Chance = styled.div`
  width: ${({percent}) => percent}%;
  height: 5px;
  background-color: ${({color}) => color};
  transition: 1s;
`;

export const Banks = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
`;
