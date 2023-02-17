#!/bin/bash

MODULE=$1
MODULE_CAP=${MODULE^}

cat <<EOF
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ${MODULE_CAP}State {
    value: number;
    error: string;
    updated: number;
    data : ${MODULE_CAP}Data[];
}

export interface ${MODULE_CAP}Data {
    id: number;
}

const initialState = {
    value: 0,
    error: '',
    updated: 0
} as ${MODULE_CAP}State


export const ${MODULE_CAP}Slice = createSlice({
    name: '${MODULE}',
    initialState,
    reducers: {
        update${MODULE_CAP}State: (state, p: PayloadAction<Partial<${MODULE_CAP}State>>) => {
            Object.assign(state, p.payload)
        },
        getValue: (state, p: PayloadAction<{ id: number }>) => {},
        setValue: (state, p: PayloadAction<{ value: number }>) => {
            state.value = p.payload.value;
            state.updated = new Date().getTime();
        },
        failed: (state, p: PayloadAction<{error:string}>) => {
                   state.error = p.payload.error;
                   state.updated = new Date().getTime();
        }

    }
});


export const ${MODULE_CAP}Acts = ${MODULE_CAP}Slice.actions;

export const ${MODULE_CAP}Reducer = ${MODULE_CAP}Slice.reducer;
EOF
