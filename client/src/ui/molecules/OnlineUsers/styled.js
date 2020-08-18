import styled, { keyframes } from 'styled-components';

import Button from 'ui/atoms/Button';
import Avatar from 'ui/atoms/Avatar';
import media from 'src/helpers/media';

export const Container = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  
  span {
    transition: .3s;
    margin-left: -150px;
  }  
 
  ${({ isVisible }) => isVisible ? `
    span {
        margin-left: 0;
    }
  `: ''}
`;
