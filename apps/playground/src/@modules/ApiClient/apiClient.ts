import { isNotNullable } from "@effect/data/Predicate";
import * as S from "@effect/schema/Schema";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";

import { apiSuccessResponse } from ":/@common/http/response/ApiResponse.ts";
import { API_RESPONSE_SUCCESS } from ":/@common/http/response/types.ts";
import { parsePathParams } from ":/@common/pathParams/index.js";
import { throwError } from ":/@modules/ApiClient/middleware/throwError.ts";

import type {
  ApiRouteAdapterInput,
  InputApiRouteWithPathParams,
} from "../ApiRoute/types.ts";

export interface ApiClientOptions {
  isDecodeResponse?: boolean;
  isEncodeRequest?: boolean;
  responseDecoder?: <I, A>(data: I) => A;
  requestEncoder?: <T>(data: unknown) => T;
}

export interface Options extends AxiosRequestConfig, ApiClientOptions {}

export const makeApiClient = (options: Options) => {
  const axiosInstance = axios.create(options);

  return {
    axiosInstance,
    apiClient:
      <ApiRouteT extends InputApiRouteWithPathParams>(apiRoute: ApiRouteT) =>
      <
        InputT extends ApiRouteAdapterInput<
          ApiRouteT,
          "data" | "params" | "pathParams"
        >,
      >(
        input: InputT,
        opt: Omit<Options, "params" | "method"> | null = null,
      ) => {
        const mergeOpt: Options = Object.assign({}, apiRoute["options"], opt);

        // request 항목들을 encode할 것인지 여부
        const isEncodeRequest = !!mergeOpt.isEncodeRequest;
        // response 항목들을 decode할 것인지 여부
        const isDecodeResponse = !!mergeOpt.isDecodeResponse;

        const parsedPath = parsePathParams(apiRoute.path, input["pathParams"]);

        // requestParams
        const params =
          isNotNullable(apiRoute.params) && isEncodeRequest
            ? S.parseSync(apiRoute.params)(input["params"])
            : input["params"];

        // RequestBody(JSON)
        const data =
          isNotNullable(apiRoute.data) && isEncodeRequest
            ? S.parseSync(apiRoute.data)(input["data"])
            : input["data"];

        const finalOptions: Options = Object.assign(
          {
            method: apiRoute.method,
            params,
            data,
          },
          opt,
          {
            headers: Object.assign({}, apiRoute?.headers, opt?.["headers"]),
          },
        );

        const res = axiosInstance(parsedPath, finalOptions);

        return res
          .then((res) => {
            const parsedData = (apiRoute.responseData && isDecodeResponse
              ? S.parseSync(apiRoute.responseData)(res.data.data)
              : // @ts-ignore
                res.data.data) as unknown as S.Schema.To<
              ApiRouteT["responseData"]
            >;

            return apiSuccessResponse({
              type: API_RESPONSE_SUCCESS,
              code: res.data.code,
              data: parsedData,
              message: res.data.message,
              statusCode: res.status,
            });
          })
          .catch(throwError);
      },
  };
};
