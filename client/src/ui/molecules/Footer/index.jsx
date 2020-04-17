import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import AuthenticationForm from 'ui/molecules/AuthenticationForm';
import CommonTitle from 'ui/atoms/Title';

export const Container = styled.div`
    padding: 25px;
    display: flex;
    justify-content: center;
    z-index: 2;
    position: relative;
    text-align: center;
`;

export const Title = styled(CommonTitle)`
  margin-bottom: 10px;
  font-size: 22px;
  position: relative;
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

function Footer({ children, icon, text, className }) {
    return (
        <Container className={className}>
            { icon }
            <Wrapper>
                <Title>{ text }</Title>
                { children }
            </Wrapper>
        </Container>
    );
}

Footer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Footer;
