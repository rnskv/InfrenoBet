import styled, { keyframes } from 'styled-components';
import BetItem from 'ui/atoms/BetItem';
import media from 'src/helpers/media';

export const StyledBetItem = styled(BetItem)`
    margin: 10px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`;
