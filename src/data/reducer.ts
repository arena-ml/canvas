import {combineReducers} from '@reduxjs/toolkit' // import-reducer-above : don't delete this comment
// import-reducer-above : don't delete this comment

// import { AuthReducer } from '~/data/auth';
// import { LogsReducer } from '~/data/logs';
// import { MetricReducer } from '~/data/metric';

export const rootReducerObj = {
    // cluster: clusterReducer,
    // node: NodeReducer,
    // metric: MetricReducer,
    // logs: LogsReducer,
    // auth: AuthReducer,
    // add-reducer-above : don't delete this comment
}

export const rootReducer = combineReducers(rootReducerObj)

export type IRootState = ReturnType<typeof rootReducer>
