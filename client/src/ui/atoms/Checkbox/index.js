import React from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
`;

const Icon = styled.svg`
  fill: none;
  stroke: var(--color-grey-800);
  stroke-width: 2px;
`;
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    height: 20px;
    width: 20px;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    margin: 0;
    opacity: 0;
    border: 2px solid rgba(0, 0, 0, 0);
    cursor: pointer;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  cursor: pointer;
  background: ${(props) => (props.checked ? 'var(--color-blue)' : 'var(--color-grey-400)')};
  border-radius: 3px;
  transition: all 150ms;
  border: 2px solid var(--color-blue);
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px var(--color-blue);
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')}
  }
`;

const Checkbox = ({ className, checked, ...props }) => (
    <CheckboxContainer className={className}>
        <StyledCheckbox checked={checked}>
            <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
            </Icon>
        </StyledCheckbox>
        <HiddenCheckbox checked={checked} {...props} />

    </CheckboxContainer>
);

export default Checkbox;
