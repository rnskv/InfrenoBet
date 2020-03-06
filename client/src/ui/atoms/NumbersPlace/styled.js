import styled from 'styled-components';

export const Container = styled.div`
  background-color: var(--color-grey-600);
  color: var(--color-white);
  padding: 5px 10px;
  font-size: 32px;
  text-align: center;
  position: relative;
  border-radius: 2px;
  font-weight: bold;
  display: flex;
  min-width: 60px;
  align-items: center;
  justify-content: center;
  
  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 50%;
    position: absolute;
    background-color: var(--color-black);
    top: 0;
    left: 0;
    opacity: 0.1;
  }
  
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 50%;
    position: absolute;
    background-color: var(--color-white);
    bottom: 0;
    left: 0;
    opacity: 0.05;
  }
`;
