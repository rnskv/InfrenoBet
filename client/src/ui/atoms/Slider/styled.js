import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import media from 'src/helpers/media';


export const Container = styled.div`
   margin: 15px 25px 0;
`;

export const HeaderTitle = styled.div`
  width: 100%;
  background: #e9eaeb;
  color: var(--color-black);
  padding: 15px 25px;
  box-sizing: border-box;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 700;
`;

export const Content = styled.div`
    color: var(--color-black);
    font-size: 14px;
    margin: 15px 0 0 0;
    max-height: ${({ visible }) => visible ? '700px' : '0'};
    overflow: hidden;
    transition: .6s linear;
    padding: 0 25px;

    ul {
        list-style: none;
        counter-reset: my-awesome-counter; 
        padding: 0;
        
        li {
            counter-increment: my-awesome-counter;
            margin-bottom: 15px;
            
            &::before {
                content: counter(my-awesome-counter);
                background: var(--color-yellow);
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 50%;
                display: inline-block;
                line-height: 1.5rem;
                color: var(--color-black);
                text-align: center;
                margin-right: 0.5rem;
            }
        }
  }
`;
