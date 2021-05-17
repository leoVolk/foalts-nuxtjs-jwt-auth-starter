import {
  Context,
  Get,
  HttpResponseConflict,
  HttpResponseNotFound,
  HttpResponseOK,
  HttpResponseUnauthorized,
  Post,
  ValidateBody,
  hashPassword,
  verifyPassword,
} from "@foal/core";
import {
  JWTRequired,
  getSecretOrPrivateKey,
  removeAuthCookie,
} from "@foal/jwt";

import { User } from "../entities";
import { promisify } from "util";
import { sign } from "jsonwebtoken";

const credentialsSchema = {
  additionalProperties: false,
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
    username: { type: "string" },
  },
  required: ["email", "password"],
  type: "object",
};

export class AuthController {
  @Post("/signup")
  @ValidateBody(credentialsSchema)
  async signup(ctx: Context) {
    const user = new User();
    user.email = ctx.request.body.email;
    user.username = ctx.request.body.username;
    user.password = await hashPassword(ctx.request.body.password);
    await user.save();

    const token = sign({ email: user.email }, getSecretOrPrivateKey(), {
      expiresIn: "24h",
    });

    return new HttpResponseOK({ token });
  }

  @Post("/login")
  @ValidateBody(credentialsSchema)
  async login(ctx: Context) {
    const user = await User.findOne({ email: ctx.request.body.email });

    if (!user) {
      return new HttpResponseUnauthorized();
    }

    if (!(await verifyPassword(ctx.request.body.password, user.password))) {
      return new HttpResponseUnauthorized();
    }

    const token = sign({ email: user.email }, getSecretOrPrivateKey(), {
      expiresIn: "24h",
    });

    return new HttpResponseOK({ token });
  }

  @Post("/logout")
  async logout(ctx: Context) {
    const response = new HttpResponseOK();
    removeAuthCookie(response);
    return response;
  }

  @JWTRequired()
  @Get("/user")
  async user(ctx: Context) {
    const user = await User.findOne({ email: ctx.user.email });

    if (!user) {
      return new HttpResponseNotFound();
    }

    return new HttpResponseOK({ user });
  }

  private async createJWT(user: User): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
    };

    return promisify(sign as any)(payload, getSecretOrPrivateKey(), {
      subject: user.id.toString(),
    });
  }
}
