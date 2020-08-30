import { useApi } from 'src/helpers/api/hooks';

const useTopPlayers = () => {
    return useApi({ service: 'games', name: 'getTopPlayersOfLastWeek' })
}

export default useTopPlayers;