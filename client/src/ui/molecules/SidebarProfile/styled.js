import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 25px;
  background-color: var(--color-grey-400);
`;
export const TotalExperienceBar = styled.div`
  width: 100%;
  position: relative;
  height: 3px;
  background-color: grey;
  margin-top: 10px;
`;
export const ExperienceBar = styled.div`
  height: 100%;
  width: ${({ percent }) => percent}%;
  background-color: #35b6d3;
  transition: width .6s;
  will-change: width;
`;
export const Name = styled.div`
  color: var(--color-white);
`;
export const Level = styled.div`
  color: #35b6d3;
  font-size: 12px;
`;
export const Experience = styled.div`
  color: var(--color-grey);
  font-size: 12px;
`;
export const Wrapper = styled.div`
  flex-grow: 1;
  padding: 0 20px;
`;
export const Information = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  
  svg {
    width: 55px;
    height: 55px;
  }
`;
