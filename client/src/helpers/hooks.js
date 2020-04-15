import { bindActionCreators } from 'redux';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

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
