import styled, { keyframes } from 'styled-components';
import Button from 'ui/atoms/Button';
import BetItem from 'ui/atoms/BetItem';

export const Container = styled.div`
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
`;

export const StyledBetItem = styled(BetItem)`
  margin: 0 10px 20px;
`;
