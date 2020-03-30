import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 30px;
    text-align: center;
    background-color: ${({ backgroundColor }) => backgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
    
    cursor: pointer;
    
    svg {
        width: 15px;
        height: 15px;
        fill: var(--color-grey);
        transition: fill .3s, transform 0.3s;
        transform: ${({ isOpened, side }) => (isOpened ? `rotateZ(${side === 'left' ? 0 : 180}deg)` : `rotateZ(${side === 'left' ? 180 : 0}deg)`)};
    }
    
    &:hover {
        svg {
            fill: var(--color-white);
        }
    }
`;
