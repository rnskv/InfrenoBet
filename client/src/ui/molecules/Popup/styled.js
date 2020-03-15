import styled from 'styled-components';

export const Container = styled.div`
  width: 700px;
  min-height: 200px;
  background-color: var(--color-grey-600);
  border-radius: 4px;
  position: relative;
  top: 6rem;
`;

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;
