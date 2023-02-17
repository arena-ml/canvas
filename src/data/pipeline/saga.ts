import axios, {AxiosResponse} from 'axios';
import {PipelineState, PipelineActs} from '~/data/pipeline';
import {call, put} from 'redux-saga/effects';
import {PayloadAction} from "@reduxjs/toolkit";

const getPipeline = (payload:{id: number}) => axios.get<PipelineState>("/api/v1/pipeline", {params: payload});

export function* PipelineSaga(action: PayloadAction<{ id: number }>) {
    try {
        const resp: AxiosResponse<PipelineState> = yield call(getPipeline, action.payload);
        yield put({type: PipelineActs.setValue, payload: resp.data});
    } catch (e) {
        yield put({type: PipelineActs.failed, payload: {error: e}});
    }
}

