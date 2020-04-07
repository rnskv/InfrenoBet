import Title from 'ui/atoms/Title';
import styled from 'styled-components';
import media from 'src/helpers/media';

export const Wrapper = styled.div`
  //width: 280px;
`;

export const FixedContainer = styled.div`
    height: calc(100vh - var(--header-height));
    margin-top: var(--header-height);
    background-color: var(--color-grey-500);
    transition: width .4s;
    overflow: hidden;
    position: fixed;
    box-shadow: 0 0 5px 1px var(--color-shadow);
    z-index: 10;
`;

const sidebars = {
    left: ({ side, isOpened }) => `
        left: 0;
        width: ${isOpened ? '280px' : '60px'};
    `,
    right: ({ side, isOpened }) => `
        right: 0;
        transform: translateX(${isOpened ? '0' : '280px'});
    `,
};

export const StaticContainer = styled.div`
    width: ${({ side, isOpened }) => (isOpened ? '280px' : '60px')};
    transition: .3s;
    ${FixedContainer} {
        ${({ side, isOpened }) => sidebars[side]({ side, isOpened })}
        transition: .3s;
    }
    
    ${media.tablet`
        display: none;
    `}
`;
