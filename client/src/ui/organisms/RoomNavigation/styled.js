import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px 10px;
    background-color: var(--color-grey-400);
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    
    svg {
      fill: var(--color-grey);
      width: 35px;
      height: 35px;
    }
    
    span {
      margin-left: 15px;
      font-size: 20px;
      font-weight: bold;
    }
`;
