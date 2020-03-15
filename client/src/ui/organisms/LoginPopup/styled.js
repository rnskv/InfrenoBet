import styled from 'styled-components';

const colors = {
    vk: '#507699',
    email: 'var(--color-grey-400)',
};

const textColors = {
    vk: '#fff',
    email: 'var(--color-yellow)',
};

export const Container = styled.div`
  padding: 35px;
`;

export const Title = styled.h4`
  color: var(--color-white);
  font-size: 24px;
  text-align: center;
  padding: 0;
  margin: 0;
`;

export const MethodSelection = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
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
  
  span {
    margin-top: 10px;
    font-size: 16px;
    color: var(--color-white);
    font-weight: 400;
  }
  
  ${MethodIcon} {
      background-color: ${({ type }) => colors[type]};
      color: ${({ type }) => textColors[type]};
  }
`;
export const AgeConfirm = styled.div`
  color: var(--color-grey);
  font-size: 14px;
  text-align: center;
`;
