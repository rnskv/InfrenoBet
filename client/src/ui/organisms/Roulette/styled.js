import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import CommonTitle from 'ui/atoms/Title';

import AuthenticationForm from 'ui/molecules/AuthenticationForm';

export const Container = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Avatars = styled.div`
    width: 24080px;
    height: 80px;
    overflow: hidden;
    img {
      width: 80px;
      height: 80px;
      display: inline-block;
    }
    
    margin-left: ${ ({isRotate }) => isRotate ? '-22400px' : 0 };
    transition: 15s;
    transition-timing-function: cubic-bezier(0.42, 0, 0.3, 0.98);
`;

export const Arrow = styled.div`
    margin-top: 15px;
    width: 100%;
    height: 5px;
    border-bottom: 2px solid var(--color-grey-500);
    position: relative;
    &:before {
        content: '';
        width: 40px;
        height: 40px;
        background: #00bbd9;
        left: calc(50% - 20px);
        transform: rotateZ(135deg);
        border: 2px solid var(--color-grey-500);
        border-right: none;
        border-top: none;
        position: absolute;
    }
`;