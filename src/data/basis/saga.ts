import axios, {AxiosResponse} from 'axios';
import {BasisState, BasisActs} from '~/data/basis';
import {call, put} from 'redux-saga/effects';
import {PayloadAction} from "@reduxjs/toolkit";

const getBasis = (payload:{id: number}) => axios.get<BasisState>("/api/v1/basis", {params: payload});

export function* BasisSaga(action: PayloadAction<{ id: number }>) {
    try {
        const resp: AxiosResponse<BasisState> = yield call(getBasis, action.payload);
        yield put({type: BasisActs.setValue, payload: resp.data});
    } catch (e) {
        yield put({type: BasisActs.failed, payload: {error: e}});
    }
}

