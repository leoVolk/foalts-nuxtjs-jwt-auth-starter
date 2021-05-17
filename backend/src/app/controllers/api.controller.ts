import { Context, Get, HttpResponseOK } from "@foal/core";

import { JWTRequired } from "@foal/jwt";

@JWTRequired()
export class ApiController {
  @Get("/")
  index(ctx: Context) {
    return new HttpResponseOK([]);
  }
}
