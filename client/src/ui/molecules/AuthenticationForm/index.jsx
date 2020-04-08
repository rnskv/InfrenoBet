import PropTypes from 'prop-types';

import React from 'react';
import styled from 'styled-components';
import Title from 'ui/atoms/Title';
import ErrorNotification from 'ui/atoms/FormErrorNotification';
import media from 'src/helpers/media';

const StyledForm = styled.form`
    width: 500px;
   
    border-radius: 8px;
      
    ${Title} {
        margin: 0 0 25px;
    }
`;

function AuthenticationForm({
    children, title, ...props
}) {
    return (
        <StyledForm {...props}>
            { title && <Title>{title}</Title> }
            { children }
        </StyledForm>
    );
}

AuthenticationForm.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};

export default AuthenticationForm;
