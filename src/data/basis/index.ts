import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface BasisState {
    value: number;
    error: string;
    updated: number;
    data : BasisData[];
}

export interface BasisData {
    id: number;
}

const initialState = {
    value: 0,
    error: '',
    updated: 0
} as BasisState


export const BasisSlice = createSlice({
    name: 'basis',
    initialState,
    reducers: {
        updateBasisState: (state, p: PayloadAction<Partial<BasisState>>) => {
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


export const BasisActs = BasisSlice.actions;

export const BasisReducer = BasisSlice.reducer;
