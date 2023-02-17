// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BasisData } from '~/data/basis'

// Define a service using a base URL and expected endpoints
export const basisApi = createApi({
  reducerPath: 'basisApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api/v1/` }),
  endpoints: (builder) => ({
    getBasisDataByID: builder.query<BasisData, string>({
      query: (name) => `basis/`,
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetBasisDataByIDQuery } = basisApi

