import styled from 'styled-components';

export const Title = styled.div`
  margin-left: 15px;
  font-size: 14px;
  font-weight: 400;
`;

export const Container = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    
    background-color: ${({ isActive }) => (isActive ? 'var(--color-grey-800) !important' : 'var(--color-grey-500)')};

    &:hover {
        background-color: var(--color-grey-600);
    }
   
    svg {
        width: 30px;
        height: 30px;
    }
    
    ${Title} {
      color: ${({ isActive }) => (isActive ? 'var(--color-yellow)' : 'var(--color-grey)')}
    }
`;
