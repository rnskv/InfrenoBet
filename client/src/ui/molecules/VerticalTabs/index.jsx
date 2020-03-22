import PropTypes from 'prop-types';
import React, { useState } from 'react';

import VerticalTab from 'ui/molecules/VerticalTab';

import {
    Container,
    Title,
} from './styled';


function VerticalTabs({
    tabs,
    activeTabName,
    onTabClick,
    title,
    style,
    className,
}) {
    return (
        <Container style={style} className={className}>
            { title ? <Title>{ title }</Title> : null }
            {
                tabs.map((tab) => (
                    <VerticalTab
                        key={tab.name}
                        name={tab.name}
                        title={tab.title}
                        svg={tab.svg}
                        onClick={() => onTabClick(tab)}
                        isActive={tab.name === activeTabName}
                    />
                ))
            }
        </Container>
    );
}

VerticalTabs.propTypes = {
    title: PropTypes.string,
    tabs: PropTypes.array.isRequired,
    activeTabName: PropTypes.string.isRequired,
    onTabClick: PropTypes.func,
};

VerticalTabs.defaultProps = {
    onTabClick: null,
    title: '',
};

export default VerticalTabs;
