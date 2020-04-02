import styled from 'styled-components';
import Checkbox from 'ui/atoms/Checkbox';

const colors = {
    vk: '#507699',
    email: 'var(--color-grey-400)',
    steam: 'var(--color-yellow)',
};

const textColors = {
    vk: '#fff',
    email: 'var(--color-yellow)',
    steam: 'var(--color-black)',
};

export const Container = styled.div`
  padding: 35px;
`;

export const Title = styled.h4`
  color: var(--color-white);
  font-size: 26px;
  text-align: center;
  padding: 0;
  margin: 0;
  font-weight: 400;
`;

export const MethodSelection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 35px 0;
`;

export const MethodIcon = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
`;

export const Method = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  cursor: pointer;
  pointer-events: ${({ isActive }) => (isActive ? 'all' : 'none')};
  span {
    margin-top: 10px;
    font-size: 16px;
    color: var(--color-white);
    font-weight: 400;
  }
  
  ${MethodIcon} {
      background-color: ${({ type }) => colors[type]};
      opacity: ${({ isActive }) => (isActive ? '1' : '0.5')};
      i {
        display: flex;
      }
      svg {
        fill: ${({ type }) => textColors[type]};
        width: 50px;
      }
  }
`;
