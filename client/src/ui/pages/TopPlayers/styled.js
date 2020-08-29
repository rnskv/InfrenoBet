import styled from 'styled-components';

export const Container = styled.table`
    width: 100%;
    padding: 20px;
    text-align: center;
`;
export const Player = styled.tr``;
export const Position = styled.td`
    color: var(--color-blue);
    font-weight: bold;
    font-size: 18px;
`;
export const Name = styled.td``;
export const TotalWin = styled.td`
    color: var(--color-yellow);
    font-size: 18px;
`;
export const AvatarBlock = styled.td`
    display: flex;
    justify-content: center;
    padding: 20px 0;
`
export const Prize = styled.td`
    color: var(--color-white);
`

export const HeaderCell = styled.td`
    font-weight: 700;
    padding: 20px 0;
    background-color: var(--color-grey-400);
    color: var(--color-white);
`

export const Empty = styled.td`
    width: 100%;
    padding: 20px 0;
    width: min-content;
    text-align: center;
`