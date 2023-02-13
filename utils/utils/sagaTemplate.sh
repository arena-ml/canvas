#!/bin/bash

MODULE=$1
MODULE_CAP=${MODULE^}

cat <<EOF
import axios, {AxiosResponse} from 'axios';
import {${MODULE_CAP}State, ${MODULE_CAP}Acts} from 'data/$MODULE';
import {call, put} from 'redux-saga/effects';
import {PayloadAction} from "@reduxjs/toolkit";

const get$MODULE_CAP = (payload:{id: number}) => axios.get<${MODULE_CAP}State>("/api/v1/${MODULE}", {params: payload});

export function* ${MODULE_CAP}Saga(action: PayloadAction<{ id: number }>) {
    try {
        const resp: AxiosResponse<${MODULE_CAP}State> = yield call(get${MODULE_CAP}, action.payload);
        yield put({type: ${MODULE_CAP}Acts.setValue, payload: resp.data});
    } catch (e) {
        yield put({type: ${MODULE_CAP}Acts.failed, payload: {error: e}});
    }
}

EOF