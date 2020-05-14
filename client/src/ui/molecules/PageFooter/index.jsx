import PropTypes from 'prop-types';
import React from 'react';
import Link from 'ui/atoms/Link';

import {
    Container,
} from './styled';

function PageFooter({}) {
    return (
        <Container>
            <span>
                INFERNOBET.RU is NOT affiliated with VALVE corp
            </span>
            <span>
                <Link to="/faq">Правила и условия</Link>
                { ' | ' }
                <a rel="noopener noreferrer" target="_blank" href="https://vk.com/infernobet_official">VK</a>
            </span>
        </Container>
    );
}

PageFooter.propTypes = {
    children: PropTypes.node,
};

PageFooter.defaultProps = {
    children: [],
};

export default PageFooter;
