import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'ui/atoms/Button';
import DefaultTemplate from 'ui/templates/Default';

import { rootApi } from 'src/redux/root/api';
import { mapStateToProps, mapDispatchToProps } from './connect';

rootApi.setBearerFromLocalStorage();

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

Main.propTypes = {
    token: PropTypes.string.isRequired,
};

Main.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
