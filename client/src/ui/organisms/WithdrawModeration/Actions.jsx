import React, { useState } from 'react';
import { infernoClient } from 'src/index';

import Button from 'ui/atoms/Button';
import { useNotificationActions } from 'src/redux/user/hooks/actions';
import { USER_PAYMENT_SUCCESS, USER_PAYMENT_ERROR } from 'shared/configs/notificationsTypes';

export default function Actions({ removeRowById, ...data }) {
    const { withdraw } = infernoClient.modules.api.services;
    const notificationsAction = useNotificationActions();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        setIsLoading(true);
        withdraw.execute('createSwiftPayout', {
            body: {
                ...data,
            },
        }).then((response) => {
            console.log('Ответ об подтверждении платежа', response);
            notificationsAction.addNotification({ type: USER_PAYMENT_SUCCESS });
        }).catch(() => {
            notificationsAction.addNotification({ type: USER_PAYMENT_ERROR });
        }).finally(() => {
            setIsLoading(false);
            removeRowById(data._id);
        });
    };

    return (
        <Button onClick={onClick} isLoading={isLoading}>
            { `Отправить $${data.amount}`}
        </Button>
    );
}
