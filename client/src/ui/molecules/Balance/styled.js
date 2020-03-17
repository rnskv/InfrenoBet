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
  
  &:after { 
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
 }
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
