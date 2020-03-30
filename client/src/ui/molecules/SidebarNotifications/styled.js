import styled from 'styled-components';
import Notification from 'ui/molecules/Notification';

export const StyledNotification = styled(Notification)`

`;

export const Message = styled.div`
  width: 100%;
  color: var(--color-white);
  font-size: 18px;
  text-align: center;
  padding: 10px 25px;
  box-sizing: border-box;
`;

export const Controls = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-grey-400);
  transition: .3s;
  height: 40px;
`;

export const Button = styled.div`
  width: 50%;
  height: 40px;
  line-height: 40px;
  color: #00aaea;
  text-align: center;
  cursor: pointer;
  transition: .3s opacity;
  &:hover {
    color: var(--color-blue)
  }
`;

export const NotificationsList = styled.div`
     overflow-x: hidden;
     overflow-y: scroll;
     
     position: absolute;
     width: 100%;
     height: calc(100% - 145px - var(--header-height));
     transition: .3s;
`;

export const Container = styled.div`
  background-color: var(--color-grey-500);
  transition: .3s;
  overflow: hidden;
  flex: 1 1 100%;
`;
