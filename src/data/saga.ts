import { takeLatest } from 'redux-saga/effects'

import { PipelineActs } from '~/data/pipeline'
import { PipelineSaga } from '~/data/pipeline/saga'
import {BasisActs} from '~/data/basis'
import {BasisSaga} from '~/data/basis/saga'
// import-saga-above - dont delete/edit this comment

export default function* RootSaga() {
    yield takeLatest(PipelineActs.getValue, PipelineSaga)
    yield takeLatest(BasisActs.getValue, BasisSaga)
// add-saga-above - dont delete/edit this comment
}
