import useApi from './useApi';

const useTopPlayers = () => {
    return useApi({ service: 'games', name: 'getTopPlayersOfLastWeek' })
}

export default useTopPlayers;