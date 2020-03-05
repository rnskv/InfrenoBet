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
    align-items: center;
    flex-direction: column;
    z-index: 2;
    position: relative;
`;

export const Title = styled(CommonTitle)`
  margin: 0 0 15px 0;
`;

function Footer({ children, text, className }) {
    return (
        <Container className={className}>
            <Title>{ text }</Title>
            { children }
        </Container>
    );
}

Footer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Footer;
