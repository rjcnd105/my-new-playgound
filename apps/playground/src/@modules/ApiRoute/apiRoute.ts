import type { ApiRoute, InputApiRoute } from ':/@modules/ApiRoute/types.js'

export const apiRoute = <const InputApiRouteT extends InputApiRoute>(route: InputApiRouteT) =>
  route as unknown as ApiRoute<InputApiRouteT>
