import styled from 'styled-components';
import BetItems from 'ui/molecules/BetItems';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--color-grey-400);
    padding: 2px;
    border-radius: 15px;
    min-width: 175px;
    margin: 0 25px;
    position: relative;
    box-sizing: border-box;
    &:after {
      content: '';
      background: var(--color-grey-400);
      position: absolute;
      width: 30px;
      height: 20px;
      clip-path: polygon(50% 75%, 0 0, 100% 0);
      bottom: -20px;
    }
`;

export const Icon = styled.img`
  height: 30px;
  margin: 5px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--color-grey-600);
  width: 100%;
  align-items: center;
  border-radius: 15px;
  box-sizing: border-box;
  
  &:after {
    content: '';
    background: var(--color-grey-600);
    position: absolute;
    width: 26px;
    height: 18px;
    clip-path: polygon(50% 75%, 0 0, 100% 0);
    bottom: -16px;
    z-index: 1;
  }
`;

export const Image = styled.img`
  width: 75px;
`;

export const LevelTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5px;
  
  b {
    margin-left: 10px;
    color: var(--color-blue)
  }
`;

export const Experience = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 11px;
  padding: 10px;
  span {
    font-size: 14px;
    color: var(--color-blue);
    margin-left: 5px;
  }
`;

export const Awards = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 11px;
  padding: 10px;
  span {
    font-size: 14px;
    color: var(--color-yellow);
    margin-left: 5px;
  }
`;
