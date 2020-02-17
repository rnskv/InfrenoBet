import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
`;

export const Wrapper = styled.div`
  @keyframes slideFromTop {
    from {
      margin-top:-${({ transactionsCount }) => 108 * transactionsCount}px; 
    } to {
      margin-top: 0;
    }
  }
  
  @keyframes slideFromGame {
    from {
      margin-top: 0; 
    } to {
      margin-top: -${({ totalTransactionsCount }) => 108 * totalTransactionsCount}px;
    }
  }
  
  animation: 
    ${({ transactionsCount, totalTransactionsCount, isGameEnd }) => {
        if (!isGameEnd) {
            return `${0.4 * transactionsCount < 1 ? 0.4 * transactionsCount : 1}s`;
        }
        return `${0.3 * totalTransactionsCount < 1 ? 0.3 * totalTransactionsCount : 1}s`;
    }}
    ease-out 
    ${({ isGameEnd }) => (isGameEnd ? 'slideFromGame' : 'slideFromTop')}
    ${({ isGameEnd }) => (isGameEnd ? '3s' : '0s')}
    forwards
`;
