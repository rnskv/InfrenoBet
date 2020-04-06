import React from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

const StyledInput = styled.input`
    color: var(--color-white);
    background: var(--color-black);
    border: 1px solid var(--color-black);
    padding: 10px 10px;
    font-size: 14px;
    
    border-top-left-radius: ${({ before }) => (before ? '0' : '3px')};
    border-top-right-radius: ${({ after }) => (after ? '0' : '3px')};
    border-bottom-right-radius: ${({ after }) => (after ? '0' : '3px')};
    border-bottom-left-radius: ${({ before }) => (before ? '0' : '3px')};
    
    width: 100%;
    box-sizing: border-box;

    &:focus {
        border-color: var(--color-yellow);
        outline: none;
    }
`;

const Label = styled.label`
    display: block;

    span {
        color: var(--color-white);
        padding: 10px 0;
        font-size: 14px;
        display: block;
    }
`;

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

const Description = styled.span`
    color: var(--color-grey);
    padding: 5px 0;
    font-size: 12px;
    display: block;
`;

const Group = styled.div`
  display: flex;
`;

const Before = styled.div`
  background: var(--color-grey-600);
  font-size: 14px;
  text-align: center;
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px 0 0 4px;
`;

const After = styled.div`
  background: var(--color-grey-600);
  font-size: 14px;
  text-align: center;
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 4px 4px 0;
`;

const Input = React.memo(React.forwardRef((
    {
        label,
        description,
        style,
        mask,
        type,
        maskType,
        className,
        onChange,
        onKeyUp,
        onMouseUp,
        onFocus,
        onBlur,
        value,
        after,
        before,
        disabled,
        hidden,
        ...props
    },
    ref,
) => {
    const MASK = {
        tel: '+7\\ (999) 999 99 99',
        money: '99999',
    };

    return (
        <Container style={style} className={className} disabled={disabled} hidden={hidden}>
            <Label>
                {label ? <span>{label}</span> : null}
                <Group>
                    {before ? <Before>{before}</Before> : null}
                    {
                        maskType
                            ? (
                                <InputMask
                                    mask={MASK[maskType]}
                                    value={value}
                                    onChange={onChange}
                                    onKeyUp={onKeyUp}
                                    onMouseUp={onMouseUp}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    maskChar=" "
                                >
                                    {(inputProps) => (
                                        <StyledInput
                                            ref={ref}
                                            type={type}
                                            after={after}
                                            before={before}
                                            {...inputProps}
                                            {...props}
                                        />
                                    )}
                                </InputMask>
                            )
                            : (
                                <StyledInput
                                    ref={ref}
                                    type={type}
                                    value={value}
                                    onChange={onChange}
                                    onKeyUp={onKeyUp}
                                    onMouseUp={onMouseUp}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    after={after}
                                    before={before}
                                    {...props}
                                />
                            )
                    }
                    {after ? <After>{after}</After> : null}
                </Group>
            </Label>
            {description ? <Description>{description}</Description> : null}
        </Container>
    );
}));

Input.defaultProps = {
    maskType: null,
    icon: null,
};

export default Input;
