import styled from 'styled-components';
import BetItems from 'ui/molecules/BetItems';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    box-sizing: border-box;
`;

export const Yellow = styled.span`
    color: var(--color-yellow);
`;

export const Blue = styled.span`
    color: var(--color-blue);
`;


export const Description = styled.div`
  color: var(--color-white);
  font-size: 20px;
  padding: 0 25px;
  line-height: 34px;
  
  b {
    display: block;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    padding: 5px;
    font-weight: 400;
  }
`;

export const AwardsContainer = styled.div`
  padding: 25px 0;
  display: flex;
  width: max-content;
  box-sizing: border-box;
`;

export const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  button {
    margin-top: 25px;
    width: 130px;
  }
`;

export const ExperienceContainer = styled.div`
  color: var(--color-white);
  padding: 15px;
  border-radius: 5px;
  background-color: var(--color-grey-400);
  font-size: 16px;
  text-align: center;
  margin: 15px;
  width: 400px;
  
  span {
    color: var(--color-blue);
    margin-left: 5px;
  }
`;
