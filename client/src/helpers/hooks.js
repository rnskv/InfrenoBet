import { bindActionCreators } from 'redux';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useMemo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { infernoClient } from 'src/index';

export function useActions(actions, deps) {
    const dispatch = useDispatch();
    return useMemo(
        () => {
            if (Array.isArray(actions)) {
                return actions.map((a) => bindActionCreators(a, dispatch));
            }
            return bindActionCreators(actions, dispatch);
        },
        deps ? [dispatch, ...deps] : [dispatch],
    );
}


export function useShallowEqualSelector(selector) {
    return useSelector(selector, shallowEqual);
}

//@todo Убрать отсюда
export function useAuth() {
    return useSelector((state) => Boolean(state.user.token));
}

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function useServices() {
    return infernoClient.modules.api.services;
}

export function useApi({
    serviceName = 'root',
    methodName = 'hello',
    body = {},
    params = {},
    counter = 0,
}) {
    const [response, setResponse] = useState(null);
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('on effect', body);
        const services = useServices();
        setIsLoading(true);
        services[serviceName].execute(methodName, { params, body }).then((response) => {
            console.log(response);
            setResponse(response);
        })
            .catch((error) => {
                console.log(err);
                setErr(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [params.limit, params.offset, counter]);

    return { isLoading, err, response };
}
