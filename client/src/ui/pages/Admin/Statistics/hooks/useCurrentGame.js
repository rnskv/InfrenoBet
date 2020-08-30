import { useApi } from 'src/helpers/api/hooks';

const useCurrentGame = () => {
    return useApi({ service: 'games', name: 'getLastCreated', repeat: 1000 })
}

export default useCurrentGame;