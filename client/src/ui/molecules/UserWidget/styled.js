import styled from 'styled-components';
import Checkbox from 'ui/atoms/Checkbox';
import Avatar from 'ui/atoms/Avatar';

export const Container = styled.div`
  position: relative;
  transition: 1s;
  width: 200px;
  height: 331px;
  margin: 0 25px 25px;
  box-sizing: border-box;  
`;

export const Title = styled.div`
  background-color: var(--color-grey-400);
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  color: var(--color-white);
  text-transform: uppercase;
  padding: 10px 0;  
`;

export const AvatarBlock = styled.div`
  width: 100%;
  display: flex;
  padding: 35px 0;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-800) url(${({ backgroundUrl }) => backgroundUrl}) center 5px;
  flex-direction: column;
  
  span {
    font-size: 14px;
    color: var(--color-white);
    margin-top: 35px;
  }
`;

export const StyledAvatar = styled(Avatar)`
    width: 90px;
    height: 90px;
`;

export const Text = styled.div`
  padding: 5px 15px;
  color: var(--color-grey);
  display: flex;
  justify-content: space-between;
  background-color: var(--color-grey-600);
  font-size: 12px;
  align-items: center;
  
  &:nth-child(1) {
    padding-top: 0;
  }
  span {
      font-size: 16px;
      color: var(--color-white);
      
      &[data-yellow] {
            color: var(--color-yellow);
      }
  }
`;

export const TextWrapper = styled.div`
  padding: 15px 0;
  background-color: var(--color-grey-600);
`;

export const SideWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  transform: rotateY(0deg);
  backface-visibility: hidden;
  transition: transform 600ms ease-in-out;
`;
