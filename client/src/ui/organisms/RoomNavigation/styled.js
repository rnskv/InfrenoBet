import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    padding: 10px 10px;
    background-color: var(--color-grey-400);
    border-bottom: 1px solid var(--color-grey-500);
    align-items: center;
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
      font-size: 18px;
      font-weight: bold;
      color: var(--color-grey);
    }
    
    &:hover {
      span {
          color: var(--color-grey-active);
      }
      svg {
          fill: var(--color-grey-active);
          width: 35px;
          height: 35px;
      }
    }
`;

export const SubPage = styled.div`
      margin-left: 15px;
      font-size: 18px;
      font-weight: bold;
      color: ${({ isActive }) => (isActive ? 'var(--color-white) !important' : 'var(--color-grey)')};
      cursor: pointer;
      
      &:hover {
        color: var(--color-grey-active);
      }
`;
