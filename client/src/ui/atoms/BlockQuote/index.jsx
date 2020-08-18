import PropTypes from 'prop-types';
import React from 'react';
import { getExchangedSum } from 'src/helpers/system';
import Svg from 'svg-inline-react';
import blockSvg from 'src/resources/svg/block.svg';

import {
    Container,
    HeaderTitle,
    Content,
} from './styled';

function BlockQuote({ className, style, children, title }) {
    return (
        <Container
            className={className}
            style={style}
        >
            <HeaderTitle> { title }</HeaderTitle>
            <Content>
                { children }
            </Content>
        </Container>
    );
}

BlockQuote.propTypes = {

};

BlockQuote.defaultProps = {

};

export default BlockQuote;
