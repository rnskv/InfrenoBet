import styled from 'styled-components';
import media from 'src/helpers/media';
import Button from 'ui/atoms/Button';

export const Container = styled.div`
  padding: 25px;
   h3 {
    font-weight: 400;
    color: var(--color-white);
    margin: 0 0 15px 0;
    padding: 0;
    font-size: 16px;
  }
`;

export const SteamSocialButton = styled(Button)`
  font-size: 14px;
  min-width: 150px;
`;

export const Accounts = styled.div`
`;

export const TradeLinks = styled.div`
  margin-top: 25px;
  input {
    min-width: 550px;
  }
`;

export const ConfirmButton = styled(Button)`
  width: 100%;
  border-radius: 0 4px 4px 0;
`;

export const TradeUrl = styled.a`
  color: var(--color-white);
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: var(--color-blue);
  position: relative;
  flex-direction: column;
  
  &:after {
    content: 'Ссылка на обмен';
    font-size: 10px;
    font-weight: bold;
    display: flex;
    color: var(--color-yellow);
    justify-content: center;
    align-items: center;
    border-radius: 4px;
  }
`;
