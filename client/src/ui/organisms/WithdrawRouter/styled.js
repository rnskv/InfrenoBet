import styled, { keyframes } from 'styled-components';
import VerticalTabs from 'ui/molecules/VerticalTabs';
import media from 'src/helpers/media';

export const StyledVerticalTabs = styled(VerticalTabs)`
  width: 300px;
  ${media.tablet`
        width: 100%;
  `}
`;

export const Container = styled.div`

`;
