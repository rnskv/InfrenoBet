import styled from 'styled-components';
import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import AuthenticationForm from 'ui/molecules/AuthenticationForm';
import BetItems from 'ui/molecules/BetItems';
import Title from 'ui/atoms/Title';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 25px 25px;
    width: 100%;
    box-sizing: border-box;
    
    button {
      margin: 25px 0;
      max-width: 180px;
    }
`;

export const StyledBetItems = styled(BetItems)`
  width:100%;
  padding: 15px 0;
  box-sizing: border-box;
  margin: 0;
  background-color: var(--color-grey-550);
`;

export const StyledTitle = styled(Title)`
  font-size: 20px;
  text-align: center;
  margin: 30px;
`;

export const Description = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  b {
    color: var(--color-yellow);
    font-weight: 700;
  }
`;

export const EmptyMessage = styled.div`
    text-align: center;
    font-size: 16px;
    color: var(--color-white);
    margin: 15px;
`;
