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
    title,
    style,
    className,
}) {
    return (
        <Container style={style} className={className}>
            <Title>{ title }</Title>
            {
                tabs.map((tab) => (
                    <VerticalTab
                        key={tab.name}
                        name={tab.name}
                        title={tab.title}
                        svg={tab.svg}
                        onClick={tab.onClick}
                        isActive={tab.name === activeTabName}
                    />
                ))
            }
        </Container>
    );
}

VerticalTabs.propTypes = {
    title: PropTypes.string.isRequired,
    tabs: PropTypes.array.isRequired,
    activeTabName: PropTypes.string.isRequired,
};

VerticalTabs.defaultProps = {

};

export default VerticalTabs;
