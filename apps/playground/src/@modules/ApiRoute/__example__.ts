import { pipe } from '@effect/data/Function'
import * as S from '@effect/schema/Schema'

import { apiRoute } from './apiRoute.ts'
import type {
  ApiRouteAdapterInput,
  ApiRouteAdapterOut,
  ApiRouteInputData,
  ApiRouteInputParams,
  ApiRouteOutput,
} from './types.ts'

const stringDateSchema = S.transform(
  S.string,
  S.Date,
  (v) => new Date(v),
  (v) => v.toString(),
)

const dateApi = apiRoute({
  method: 'POST',
  path: '/calendar/:year/:month/:day',
  params: S.struct({
    date: stringDateSchema,
  }),
  data: S.struct({
    code: S.string,
  }),
  responseData: S.struct({
    eventDates: pipe(
      S.array(S.string),
      S.transform(
        S.array(S.Date),
        (v) => v.map((d) => d.toString()),
        (v) => v.map((d) => new Date(d)),
      ),
    ),
  }),
})

export type DateApiRouteAdapterInput = ApiRouteAdapterInput<typeof dateApi>
export type DateApiRouteAdapterOut = ApiRouteAdapterOut<typeof dateApi>
export type DateApiOutput = ApiRouteOutput<typeof dateApi>
export type DateApiInputParams = ApiRouteInputParams<typeof dateApi>
export type DateApiInputData = ApiRouteInputData<typeof dateApi>
