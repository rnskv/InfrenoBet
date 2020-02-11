import Title from 'ui/atoms/Title';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 300px;
`;

export const Collapse = styled.div`
    width: 100%;
    height: 40px;
    text-align: center;
    background-color: var(--color-grey-400);
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    cursor: pointer;
    
    svg {
        width: 20px;
        fill: var(--color-grey);
        transition: fill .3s, transform 0.3s;
            }
    
    &:hover {
        svg {
            fill: var(--color-white);
        }
    }
`;


export const Container = styled.div`
  width: ${({ isOpened }) => (isOpened ? '300px' : '80px')};
  height: calc(100vh - 50px);
  background-color: var(--color-grey-500);
  transition: width .4s;
  overflow: hidden;
  position: absolute;
  
  ${({ side }) => `${side}: 0;`
}
  
  ${Collapse} {
    svg {
      transform: ${({ isOpened, side }) => (isOpened ? `rotateZ(${ side === 'left' ? 0 : 180}deg)` : `rotateZ(${ side === 'left' ? 180 : 0}deg)`)};
    }
  }
`;
