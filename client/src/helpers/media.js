import { css } from 'styled-components';

const sizes = {
    desktop: 1000,
    tablet: 900,
    phone: 700,
    nokia: 400,
};

export default Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label]}px) {
         ${css(...args)};
      }
   `;
    return acc;
}, {});
