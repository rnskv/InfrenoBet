import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
  position: relative;
  z-index: 2;
`;

export const Wrapper = styled.div`
  @keyframes slideFromTop {
    from {
      margin-top:-${({ betsCount }) => 100 * betsCount}px; 
    } to {
      margin-top: 0;
    }
  }
  
  @keyframes slideFromGame {
    from {
      margin-top: 0; 
    } to {
      margin-top: -${({ totalBetsCount }) => 100 * totalBetsCount}px;
    }
  }
  
  animation: 
    ${({ betsCount, totalBetsCount, isGameEnd }) => {
        if (!isGameEnd) {
            return `${0.4 * betsCount < 1 ? 0.4 * betsCount : 1}s`;
        }
        return `${0.3 * totalBetsCount < 1 ? 0.3 * totalBetsCount : 1}s`;
    }}
    ease-out 
    ${({ isGameEnd }) => (isGameEnd ? 'slideFromGame' : 'slideFromTop')}
    ${({ isGameEnd }) => (isGameEnd ? '3s' : '0s')}
    forwards
`;
