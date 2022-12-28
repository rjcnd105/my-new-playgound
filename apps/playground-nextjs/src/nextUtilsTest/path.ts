import { getPathMatch } from "next/dist/shared/lib/router/utils/path-match";
import { parsePath } from "next/dist/shared/lib/router/utils/parse-path";
import { getNextPathnameInfo } from "next/dist/shared/lib/router/utils/get-next-pathname-info";
import { normalizeAppPath } from "next/dist/shared/lib/router/utils/app-paths";
import { isDynamicRoute } from "next/dist/shared/lib/router/utils";
import {
  getNamedRouteRegex,
  getRouteRegex,
} from "next/dist/shared/lib/router/utils/route-regex";
import {
  searchParamsToUrlQuery,
  urlQueryToSearchParams,
} from "next/dist/shared/lib/router/utils/querystring";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";

const testPath = "/api/payItem/1243/aaa?name=hj&age=42#title";
const testDynamicPath = "/api/payItem/:id/:user/[...slug]";
const testSuccessPath = "/api/payItem/1243/aaa/bbb/ccc/ddd/";
const testFailPath = "/api/1243/aaa/kkk/lll?name=aaa";
// 다이나믹 라우팅 매칭을 위해 사용
getPathMatch("/api/payItem/:id/:user")("/api/payItem/1243/aa"); /*?*/
getPathMatch(testDynamicPath)(testSuccessPath); /*?*/
// { id: '1243', user: 'aa' }

getPathMatch("/api/payItem/:id/:user")("/api/payItem/1243"); /*?*/
// false

getPathMatch("/payItem/:id")("/api/payItem/1243/aaa"); /*?*/

parsePath(testPath); /*?*/
/*
{ pathname: '/api/payItem/1243/aaa',
  query: '?name=hj&age=42',
  hash: '#title' }
 */
// getNextPathnameInfo(testPath, { parseData: true }) /*?*/;

isDynamicRoute(testDynamicPath); /*?*/ // true
isDynamicRoute(testPath); /*?*/ // false

// path -> parsedURL
const parsedURL = parseUrl(testPath); /*?*/

// parsedURL.query -> URLSearchParams
const searchParams = urlQueryToSearchParams(parsedURL.query); /*?*/

// URLSearchParams -> parsedURL.query
searchParamsToUrlQuery(searchParams) /*?*/;
// const reg1 = getRouteRegex(testDynamicPath); /*?*/
// const reg2 = getNamedRouteRegex(testDynamicPath); /*?*/
// reg1.re /*?*/;
// reg1.re.test(testSuccessPath); /*?*/
// reg2.re.test(testSuccessPath); /*?*/
// reg1.re.test(testFailPath); /*?*/
// reg2.re.test(testFailPath); /*?*/

// normalizeAppPath(testPath); /*?*/
