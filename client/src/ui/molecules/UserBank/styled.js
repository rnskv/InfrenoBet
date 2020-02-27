import styled from 'styled-components';

import Button from 'ui/atoms/Button';

export const Container = styled.div`
   width: 100px;
   box-sizing: border-box;
   background: ${({ containerColor }) => containerColor};
   display: inline-flex;
   align-items: center;
   justify-content: space-around;
   padding: 15px 15px 5px;
   flex-direction: column;
   border-bottom: 5px solid ${({ borderColor }) => borderColor};
   margin: 0 1px;
`;

// export const Avatar = styled.img`
//     width: 60px;
//     height: 60px;
//     border-radius: 50%;
// `;

export const Bet = styled.div`
    margin: 5px 0 ;
    color: var(--color-white);
    text-align: center;
    font-weight: 700;
`;

export const Chance = styled.div`
    margin: 5px 0 ;
    color: var(--color-white);
    text-align: center;
`;

export const TextAvatar = styled.div`
   width: 60px;
   height: 60px;
   border-radius: 50%;
   color: var(--color-white);
   background: var(--color-darkblue);
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 28px;
   font-weight: bold;
   border: 4px solid var(--color-white);
   box-shadow: inset 0 0 0 6px var(--color-black);
};`;
