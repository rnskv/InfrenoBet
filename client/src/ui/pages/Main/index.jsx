import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'ui/atoms/Button';
import DefaultTemplate from 'ui/templates/Default';

import { rootApi } from 'src/redux/root/api';
import { mapStateToProps, mapDispatchToProps } from './connect';

rootApi.setBearerFromLocalStorage();

const handler = async () => {
    const result = await rootApi.execute('test');
    alert(result.body);
};

let isSubscribed = false;

function Main({
    time, hash, secret, transactions, winner, users, join, transaction, subscribe, token,
}) {
    useEffect(() => {
        if (isSubscribed) return;
        subscribe();
    }, []);
    return (
        <DefaultTemplate>
            <div>
                { !token ? <Link to="/login">Go to login</Link> : token}
            </div>
            <Button onClick={handler}>Test action with token</Button><br/><br/>
            <Button onClick={transaction}>Make transaction</Button>
            <p>
                Время до конца -
                { time }
            </p>


            <p>
                Хэш раунда -
                { hash }
            </p>

            <p>
                Победитель раунда -
                { winner.name }
            </p>

            <p>
                Секретно число раунда -
                { secret || 'secret'}
            </p>
            <div>
                Игроки в банке:
                {
                    users.map((user, index) => <div key={index}>{ user ? user.name : 'test' }</div>)
                }
            </div>

            <div>
                Транзакции
                {
                    transactions.map((transaction, index) => (
                        <div key={index}>{ index }.) { transaction.user.name } - { transaction.value }</div>
                    ))
                }
            </div>

        </DefaultTemplate>
    );
}

Main.propTypes = {
    token: PropTypes.string.isRequired,
    subscribe: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    join: PropTypes.func.isRequired,
};

Main.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
