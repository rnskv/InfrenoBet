import styled from 'styled-components';
import CommonBetItems from 'ui/molecules/BetItems';
import CommonButton from 'ui/atoms/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

export const Button = styled(CommonButton)`
  margin: 10px;
`;

export const BetItems = styled(CommonBetItems)`
  width: 555px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: start;
`;
