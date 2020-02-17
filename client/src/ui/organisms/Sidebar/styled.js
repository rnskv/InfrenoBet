import Title from 'ui/atoms/Title';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 300px;
`;

export const FixedContainer = styled.div`
    height: calc(100vh - 50px);
    margin-top: 50px;
    background-color: var(--color-grey-500);
    transition: width .4s;
    overflow: hidden;
    position: fixed;
    box-shadow: 0 0 5px 1px var(--color-shadow);
`;


export const Collapse = styled.div`
    width: 100%;
    height: 30px;
    text-align: center;
    background-color: var(--color-grey-400);
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    cursor: pointer;
    
    svg {
        width: 15px;
        height: 15px;
        fill: var(--color-grey);
        transition: fill .3s, transform 0.3s;
            }
    
    &:hover {
        svg {
            fill: var(--color-white);
        }
    }
`;

export const StaticContainer = styled.div`
    width: ${({ isOpened }) => (isOpened ? '300px' : '80px')};
    transition: .3s;
    ${FixedContainer} {
        width: ${({ isOpened }) => (isOpened ? '300px' : '80px')};
        ${({ side }) => `${side}: 0;`}
        ${Collapse} {
            svg {
              transform: ${({ isOpened, side }) => (isOpened ? `rotateZ(${side === 'left' ? 0 : 180}deg)` : `rotateZ(${side === 'left' ? 180 : 0}deg)`)};
            }
        }
    }
`;
