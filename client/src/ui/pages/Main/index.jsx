import PropTypes from 'prop-types';

import React from 'react';
import { connect } from 'react-redux';

import DefaultTemplate from 'ui/templates/Default';

import {
    Link,
} from 'react-router-dom';

function Main({ token }) {
    return (
        <DefaultTemplate>
            Welcome Home,
            { !token ? <Link to="/login">Go to login</Link> : token}
        </DefaultTemplate>
    );
}

function mapDispatchToProps() {
    return {

    };
}

function mapStateToProps(state) {
    return {
        token: state.user.token,
    };
}

Main.propTypes = {
    token: PropTypes.string.isRequired,
};

Main.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
