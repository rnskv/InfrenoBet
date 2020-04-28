import React, { useState } from 'react';
import { infernoClient } from 'src/index';

import Button from 'ui/atoms/Button';
import { useNotificationActions } from 'src/redux/user/hooks/actions';
import { USER_PAYMENT_SUCCESS, USER_PAYMENT_ERROR } from 'shared/configs/notificationsTypes';
import { useServices } from 'src/helpers/hooks';

export default function Actions({
    _id,
    user,
    amount,
    destination,
    updateLastWithdraw,
}) {
    const { withdraw } = useServices();
    const notificationsAction = useNotificationActions();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        setIsLoading(true);
        withdraw.execute('createSwiftPayout', {
            body: {
                _id,
                user,
                amount,
                destination,
            },
        }).then((response) => {
            console.log('Ответ об подтверждении платежа', response);
            notificationsAction.addNotification({ type: USER_PAYMENT_SUCCESS });
            updateLastWithdraw({
                _id,
                user,
                amount,
                destination
            });
        }).catch(() => {
            notificationsAction.addNotification({ type: USER_PAYMENT_ERROR });
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <Button onClick={onClick} isLoading={isLoading}>
            { `Отправить $${amount}`}
        </Button>
    );
}
