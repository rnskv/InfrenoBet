import styled from 'styled-components';

export const Container = styled.div`
   width: 100%;
   background: linear-gradient(to right, #3a4364, var(--color-grey-500));
   border: solid 2px #3a4364;
   display: flex;
   margin-top: 25px;
`;

export const Icon = styled.div`
   color: var(--color-white);
   font-size: 30px;
   width: 150px;
   display: flex;
   justify-content: center;
   align-items: center;
`;

export const Item = styled.div`
   padding: 15px;
   display: flex;
   flex-direction: column;
   text-align: center;
   align-items: center;
   justify-content: center;
   min-height: 100px;
`;

export const Value = styled.div`
   color: var(--color-white);
   font-size: 35px;
`;

export const Title = styled.div`
   color: var(--color-grey);
   font-size: 16px;
`;
