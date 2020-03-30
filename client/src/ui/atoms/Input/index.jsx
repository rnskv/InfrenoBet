import React from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

const StyledInput = styled.input`
    color: var(--color-white);
    background: var(--color-black);
    border: 1px solid var(--color-black);
    padding: 10px 10px;
    font-size: 14px;
    border-radius: 3px;
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
`;

const Description = styled.span`
    color: var(--color-grey);
    padding: 5px 0;
    font-size: 12px;
    display: block;
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
        ...props
    },
    ref,
) => {
    const MASK = {
        tel: '+7\\ (999) 999 99 99',
        money: '99999',
    };

    return (
        <Container style={style} className={className}>
            <Label>
                {label ? <span>{label}</span> : null}
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
                                {...props}
                            />
                        )
                }
            </Label>
            {description ? <Description>{description}</Description> : null}
        </Container>
    );
}));

Input.defaultProps = {
    maskType: null,
};

export default Input;
