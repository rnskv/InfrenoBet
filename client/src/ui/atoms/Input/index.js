import styled from 'styled-components';

const StyledInput = styled.input`
    color: var(--color-white);
    background: var(--color-black);
    border: 1px solid var(--color-black);
    padding: 10px 10px;
    font-size: 14px; 
    border-radius: 3px;
 
    &:focus {
        border-color: var(--color-yellow);
        outline: none;
    }
`;


export default StyledInput;
