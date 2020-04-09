import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import AuthenticationForm from 'ui/molecules/AuthenticationForm';

export const Container = styled.div`
    display: flex;
    justify-content: center;
`;

export const StyledButton = styled(Button)`
  min-width: 170px;
  margin: 20px 0 0;
`;

export const StyledForm = styled(AuthenticationForm)`
    width: 500px;
    ${Input} {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 20px;
    }
`;

export const Label = styled.label`
`;

export const Name = styled.span`
    color: var(--color-grey);
    margin: 10px 0;
    display: block;
`;
