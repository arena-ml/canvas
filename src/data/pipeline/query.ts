// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { PipelineData } from '~/data/pipeline'

// Define a service using a base URL and expected endpoints
export const pipelineApi = createApi({
  reducerPath: 'pipelineApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api/v1/` }),
  endpoints: (builder) => ({
    getPipelineDataByID: builder.query<PipelineData, string>({
      query: (name) => `pipeline/`,
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetPipelineDataByIDQuery } = pipelineApi

