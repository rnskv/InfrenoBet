import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import AuthenticationForm from 'ui/molecules/AuthenticationForm';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
`;

export const StyledForm = styled(AuthenticationForm)`
    ${Input} {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 20px;
    }
    
    ${Button} {
        margin: 0 0;
    }
`;

export const Label = styled.label`
`;

export const Name = styled.span`
    color: var(--color-grey);
    margin: 10px 0;
    display: block;
`;
