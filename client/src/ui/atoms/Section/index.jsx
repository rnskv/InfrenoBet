import styled from 'styled-components';
import media from 'src/helpers/media';

const Section = styled.section`
    display: flex;
    position: relative;
    min-height: 400px;
    background: ${ ({ backgroundColor }) => backgroundColor || 'var(--color-grey-500)'};
    box-sizing: border-box;
    ${media.tablet`
        flex-direction: column;
    `}
`;

export default Section;
