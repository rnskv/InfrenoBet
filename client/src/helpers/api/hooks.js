//@todo move to common hooks;
import { useEffect, useState } from 'react';
import { useServices } from 'src/helpers/hooks';

export const useApi = ({ service, name, repeat = null }) => {
    const services = useServices();
    const [pending, setPending] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let timeout = null;
        const handler = () => {
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

            if (repeat) {
                setTimeout(handler, repeat)
            }
        }

        handler();

        return () => clearTimeout(timeout)
    }, [])

    return { data, error, pending };
}