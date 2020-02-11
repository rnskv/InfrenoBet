import styled from 'styled-components';
import Notification from 'ui/molecules/Notification';

export const StyledNotification = styled(Notification)`

`;

export const Controls = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-grey-400);
  transition: .3s;
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
`;

export const Icon = styled.img`
  width: 50px;
  height: 50px;
  margin: 15px;
  transition: 0.3s opacity;
  border-radius: 50%;
`;

export const Container = styled.div`
  background-color: var(--color-grey-500);
  transition: .3s;
  overflow: hidden;
 
  ${NotificationsList} {
      overflow: hidden;
      transition: .3s;
      margin-top: ${({ isOpened }) => isOpened ? '0' : '100vh'};
  }
  
  ${Controls} {
    height: ${({ isOpened }) => isOpened ? '40px' : '0'};
    overflow: hidden;
  }
  
  ${Icon} {
      margin: ${({ isOpened }) => isOpened ? '0' : '15px'};
      height: ${({ isOpened }) => isOpened ? '0' : '50px'};
      opacity: ${({ isOpened }) => isOpened ? '0' : '1'};
      transition-delay: ${({ isOpened }) => isOpened ? '0s' : '.3s'};
  }
`;