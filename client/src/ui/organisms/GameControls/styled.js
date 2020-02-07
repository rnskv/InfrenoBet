import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import CommonTitle from 'ui/atoms/Title';

import AuthenticationForm from 'ui/molecules/AuthenticationForm';

export const Container = styled.div`
    background: var(--color-white);
    padding: 25px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid var(--color-grey);
`;
