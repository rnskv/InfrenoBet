import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import AuthenticationForm from 'ui/molecules/AuthenticationForm';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    position: absolute;
    background: var(--color-grey-600);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 15px;
    box-sizing: border-box;
    text-align: center;
    
    p {
      font-size: 12px;
      margin: 0 0 15px 0;
    }
    
    button {
      font-size: 14px;
    }
    
    svg {
        width: 60px;
        height: 60px;
        fill: var(--color-white);
        margin: 50px 0 15px;
    }
`;

export const Title = styled.h4`
  color: var(--color-white);
  padding: 0;
  margin: 0;
  font-weight: 400;
`;

export const LogInButton = styled(Button)`
  margin-top: 15px;
`;
