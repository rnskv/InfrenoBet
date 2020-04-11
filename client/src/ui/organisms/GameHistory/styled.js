import styled from 'styled-components';
import Avatar from 'ui/atoms/Avatar';
import CommonTitle from 'ui/atoms/Title';
import NumbersPlace from 'ui/atoms/NumbersPlace';
import media from 'src/helpers/media';
import BetItems from 'ui/molecules/BetItems';

export const StyledAvatar = styled(Avatar)`
    width: 70px;
    height: 70px;
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    background: var(--color-grey-500);
    border-bottom: 50px solid var(--color-grey-600);
`;

export const Horizontal = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 15px;
`;

export const Nickname = styled.div`
  padding: 25px;
  color: var(--color-white);
  span {
    margin-left: 5px;
    color: var(--color-yellow);
  }
`;

export const Information = styled.div`
  padding: 25px;
`;

export const GameId = styled.div`
  color: var(--color-white);
  font-size: 20px;
`;

export const Date = styled.div`
  color: var(--color-grey);
  font-size: 14px;
`;

export const Cash = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 15px;
`;

export const Text = styled.div`
  color: var(--color-white);
  font-size: 14px;
  
  span {
    margin: 0 5px;
    font-size: 12px;
    font-weight: bold;
    
    b {
      font-size: 16px;
    }
  }
  
  span[data-color=yellow] {
     color: var(--color-yellow);
  }
  
  span[data-color=blue] {
     color: var(--color-blue);
  }
`;

export const Items = styled.div`
  width: 100%;
  justify-content: flex-start;
  h3 {
    color: var(--color-white);
    padding: 0;
    margin: 25px 0 0 25px;
    font-size: 14px;
    font-weight: 400;
  }
`;

export const Chances = styled.div`
  width: 100%;
`;

export const Block = styled.div`
  display: flex;
  align-items: center;
  margin: 0 25px 25px;
`;

export const StyledBetItems = styled(BetItems)`
  justify-content: flex-start;
`;
