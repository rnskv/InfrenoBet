import styled from 'styled-components';

export const Icon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  color: var(--color-white);
  background-color: var(--color-grey-500);
  font-size: 14px;
  border-bottom: 1px solid var(--color-grey-400);
  display: flex;
  cursor: pointer;
  &:hover {
      ${Icon} {
        transition: .6s transform;
        transform: rotateY(360deg)
      }
  }
`;


export const Title = styled.div`
`;

export const Text = styled.div`
  margin: 5px 0;
`;

export const Date = styled.div`
  font-size: 12px;
  color: var(--color-grey);
`;

export const Content = styled.div`
  margin-left: 15px;
`;
