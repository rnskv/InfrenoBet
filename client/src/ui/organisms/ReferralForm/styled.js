import styled from 'styled-components';
import Avatar from 'ui/atoms/Avatar';

export const Container = styled.div`
  margin: 25px;
  border-bottom: 1px solid var(--color-grey-400);
  display: flex;
  justify-content: space-between;
`;

export const ReferralLink = styled.div`
  width: 45%;
  button { 
    width: 100%;
    border-radius: 0 4px 4px 0;
  }
  p {
    color: var(--color-white);
    font-size: 14px;
    line-height: 20px;
  }
  input {
    min-width: 250px;
  }
`;
