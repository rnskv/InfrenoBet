import styled from 'styled-components';
import Avatar from 'ui/atoms/Avatar';

export const Container = styled.div`
    display: flex;
    width: 100%;
    padding: 25px;
    background: var(--color-grey-400);
    box-sizing: border-box;
    color: var(--color-white);
    position: relative;
`;

export const AvatarBlock = styled.div`
  display: flex;
  margin: 0 15px;
`;

export const InformationBlock = styled.div`
  display: flex;
  flex-direction: column; 
  margin-left: 25px;
  height: 100%;
`;

export const StyledAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  padding: 5px;
  
  img {
    border-radius: 50%;
  }
`;

export const Name = styled.div`
  font-size: 18px;
`;

export const Status = styled.div`
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    margin-top: 5px;
`;

export const Stats = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  line-height: 24px;
  
  span {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    
    b {
      font-weight: 400;
      color: var(--color-white);
      margin-left: 5px;
      font-size: 16px;
    }
  }
`;

