import { combineReducers } from '@reduxjs/toolkit' // import-reducer-above : don't delete this comment
import { PipelineReducer } from '~/data/pipeline'
import {PipelineReducer} from '~/data/pipeline'
import {BasisReducer} from '~/data/basis'
// import-reducer-above : don't delete this comment


export const rootReducerObj = {
    // cluster: clusterReducer,
    // node: NodeReducer,
    // metric: MetricReducer,
    // logs: LogsReducer,
    // auth: AuthReducer,
    pipeline: PipelineReducer,
    pipeline: PipelineReducer,
    basis: BasisReducer,
// add-reducer-above : don't delete this comment
}

export const rootReducer = combineReducers(rootReducerObj)

export type IRootState = ReturnType<typeof rootReducer>
