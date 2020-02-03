import PropTypes from 'prop-types';

import React from 'react';
import { connect } from 'react-redux';

import DefaultTemplate from 'ui/templates/Default';

import Button from 'ui/atoms/Button';

import {
    Link,
} from 'react-router-dom';

import { rootApi } from 'src/redux/root/api';

rootApi.setHeader('Authorization', window.localStorage.getItem('token'));

const handler = async () => {
    const result = await rootApi.execute('test');

    alert(result.body)
};

function Main({ token }) {
    return (
        <DefaultTemplate>
            <div>
                { !token ? <Link to="/login">Go to login</Link> : token}
            </div>
            <Button onClick={handler}>Test action with token</Button>
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
