import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Currency = styled.div`
  color: var(--color-grey);
  font-size: 12px;
  margin-left: 5px;
`;

export const Value = styled.div`
  color: var(--color-yellow);
  margin-top: 3px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Text = styled.div`
  color: var(--color-white);
`;
