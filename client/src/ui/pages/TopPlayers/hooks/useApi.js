//@todo move to common hooks;
import { useEffect, useState } from 'react';
import { useServices } from 'src/helpers/hooks';

const useApi = ({ service, name }) => {
    const services = useServices();
    const [pending, setPending] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        services[service].execute(name)
        .then((response) => {
            setData(response)
        })
        .catch((error) => {
            setError(error)
        })
        .finally(() => {
            setPending(false);
        })
    }, [])

    return { data, error, pending };
}

export default useApi;