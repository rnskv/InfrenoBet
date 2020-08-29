import styled from 'styled-components';

export const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000cc;

    z-index: 100;
`;

export const Container = styled.div`
    width: 450px;
    text-align: center;
    padding: 50px;
    background: var(--color-yellow);
    color: #272727;
    border-radius: 5px;
    font-size: 18px;
    line-height: 24px;
`;