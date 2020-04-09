import styled from 'styled-components';

const COLORS = {
    white: `
        fill: white;
    `,
    dark: `
        fill: yellow;
    `,
};

const SIZES = {
    big: `
        width: 70px;
    `,
    small: `
        width: 20px;
    `,
};

export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 15px;
 
  svg {
    ${({ size }) => SIZES[size]} 
    path {
      ${({ color }) => COLORS[color]} 
    }
  }
`;

export const Container = styled.div`
  svg {
    width: 25px;
    fill: var(--color-grey-800);
  }
`;
