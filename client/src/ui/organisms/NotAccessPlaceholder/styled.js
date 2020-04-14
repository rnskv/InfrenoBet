import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import AuthenticationForm from 'ui/molecules/AuthenticationForm';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    background: rgba(24, 35, 40, 0.9);
    box-shadow: 0 0 16px 2px rgba(24, 35, 40, 0.7);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
`;

export const Title = styled.h4`
  color: var(--color-white);
  padding: 0;
  margin: 0;
  font-weight: 400;
`;
