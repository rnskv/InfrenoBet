import styled from 'styled-components';

import Button from 'ui/atoms/Button';

export const Container = styled.div`
    padding: 25px;
    background-color: var(--color-grey-400);
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
    
    ${Button} {
        margin: 15px;
    }
`;

export const Description = styled.p`
    color: var(--color-grey);
    max-width: 420px;
    text-align: center;
`;
