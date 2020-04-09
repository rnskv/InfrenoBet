import styled from 'styled-components';
import media from 'src/helpers/media';

const Section = styled.section`
    display: flex;
    position: relative;
    min-height: 400px;
    background: var(--color-grey-500);

    ${media.tablet`
        flex-direction: column;
    `}
`;


export default Section;
