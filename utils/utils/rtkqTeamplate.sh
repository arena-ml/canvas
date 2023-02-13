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

// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi

EOF
