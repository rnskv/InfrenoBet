import styled, { keyframes } from 'styled-components';
import BetItem from 'ui/atoms/BetItem';
import Loader from 'ui/atoms/Loader';
import media from 'src/helpers/media';

export const StyledBetItem = styled(BetItem)`
    margin: 5px;
    overflow: hidden;
`;

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
`;

export const StyledLoader = styled(Loader)`
    background: var(--color-grey-600);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    justify-content: center;
    align-items: center;
    display: ${({hidden}) => hidden ? 'none' : 'flex'};
    
    svg {
      width: 70px;
      height: 70px;
      
      path {
        fill: var(--color-white)
      }
    }
`;
