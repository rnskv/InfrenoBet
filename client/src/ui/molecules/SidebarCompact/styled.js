import styled from 'styled-components';
import media from 'src/helpers/media';
import Avatar from 'ui/atoms/Avatar';

export const Container = styled.div`
  position: fixed;
  right: 0;
  height: calc(100vh - var(--header-height));
  width: 60px;
  top: var(--header-height);
  display: flex;
  align-items: center;
  z-index: 2;

  ${media.tablet`
    display: none;
  `}
`;

export const Wrapper = styled.div`
  width: 100%;
  background-color: var(--color-grey-400);
  border-radius: 5px 0 0 5px;
  min-height: 50px;
  padding: 15px 5px;
  box-shadow: 0 5px 20px 0 var(--color-black);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledAvatar = styled(Avatar)`
  width: 30px;
  height: 30px;
  margin-top: 15px;
`;
