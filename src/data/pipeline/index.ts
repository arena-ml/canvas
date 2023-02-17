import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface PipelineState {
    value: number;
    error: string;
    updated: number;
    data : PipelineData[];
}

export interface PipelineData {
    id: number;
}

const initialState = {
    value: 0,
    error: '',
    updated: 0
} as PipelineState


export const PipelineSlice = createSlice({
    name: 'pipeline',
    initialState,
    reducers: {
        updatePipelineState: (state, p: PayloadAction<Partial<PipelineState>>) => {
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


export const PipelineActs = PipelineSlice.actions;

export const PipelineReducer = PipelineSlice.reducer;
