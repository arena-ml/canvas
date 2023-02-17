#!/bin/bash

MODULE=$1
MODULE_CAP=${MODULE^}
MODULE_API_DATA=${MODULE_CAP}Data

cat <<EOF
// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ${MODULE_API_DATA} } from '~/data/$MODULE'

// Define a service using a base URL and expected endpoints
export const ${MODULE}Api = createApi({
  reducerPath: '${MODULE}Api',
  baseQuery: fetchBaseQuery({ baseUrl: \`/api/v1/\` }),
  endpoints: (builder) => ({
    get${MODULE_API_DATA}ByID: builder.query<${MODULE_API_DATA}, string>({
      query: (name) => \`${MODULE}/${resID}\`,
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGet${MODULE_API_DATA}ByIDQuery } = ${MODULE}Api

EOF
