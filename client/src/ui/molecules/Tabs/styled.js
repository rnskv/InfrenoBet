import styled from 'styled-components';
import media from 'src/helpers/media';
import Button from 'ui/atoms/Button';

export const Container = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 2px 0;
  position: relative;
  width: 100%;
  height: 50px;
`;

export const Tab = styled.li`
  text-decoration: none;
  color: var(--color-white);
  width: 25%;
  list-style: none;
  text-transform: uppercase;
  text-align: center;
  
  background-color: ${({ isActive }) => isActive ? 'var(--color-grey-500)' : 'var(--color-grey-400)'};
  
  margin: 0 1px;
  box-sizing: border-box;
  
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-white);
    font-size: 14px;
  }
`;
