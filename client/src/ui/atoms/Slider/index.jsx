import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
    Container,
    HeaderTitle,
    Content,
} from './styled';

function Slider({
    className, style, children, title,
}) {
    const [isOpened, setIsOpened] = useState(true);

    return (
        <Container
            className={className}
            style={style}
        >
            <HeaderTitle onClick={() => setIsOpened(!isOpened)}>
                { title }
            </HeaderTitle>
            <Content visible={isOpened}>
                { children }
            </Content>
        </Container>
    );
}

Slider.propTypes = {

};

Slider.defaultProps = {

};

export default Slider;
