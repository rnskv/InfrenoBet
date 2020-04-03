import { useActions } from 'src/helpers/hooks';
import { infernoClient } from 'src/index';

const {
    open, close
} = infernoClient.modules.store.actions.betMaker;


export const useBetMakerActions = () => useActions({ open, close });
