import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    background: var(--color-grey-800);
    position: relative;
    flex-direction: column;
    z-index: 2; 
`;

export const ChancesBar = styled.div`
  width: 100%;
  height: 5px;
  background: var(--color-black);
  position: relative;
  display: flex;
`;

export const Chance = styled.div`
  width: ${({ percent }) => percent}%;
  height: 5px;
  background-color: ${({ color }) => color};
`;

export const Banks = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
`;
