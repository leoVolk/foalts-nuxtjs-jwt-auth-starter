import { Context, Get, HttpResponseNotFound, HttpResponseOK } from "@foal/core";

import { JWTRequired } from "@foal/jwt";
import { User } from "../entities";
export class UserController {
  @JWTRequired()
  @Get("/")
  async me(ctx: Context) {
    const user = await User.findOne({ email: ctx.user.email });

    if (!user) {
      return new HttpResponseNotFound();
    }

    return new HttpResponseOK({ user });
  }
}
