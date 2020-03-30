import styled, { keyframes } from 'styled-components';
import Button from 'ui/atoms/Button';
import Loader from 'ui/atoms/Loader';

export const StyledLoader = styled(Loader)`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: var(--color-grey-600);
  padding: 15px 0;
  svg {
    width: 40px;
    height: 40px;
    fill: white !important;
    path {
      fill: white !important;
    }
  }
`;
export const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
`;
