import { ComicDataTypes } from '../types';

export interface TriggerLoading {
    type: ComicDataTypes.TRIGGER_LOADING;
}

export function TriggerLoadingCreator(): TriggerLoading {
    return {
        type: ComicDataTypes.TRIGGER_LOADING
    };
}