import styled from 'styled-components';
import media from 'src/helpers/media';

const Section = styled.section`
    display: flex;
    position: relative;
    min-height: 400px;
    
    ${media.tablet`
        flex-direction: column;
    `}
`;


export default Section;
