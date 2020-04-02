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
