import { ApiController, AuthController, UserController } from "./controllers";
import { IAppController, controller } from "@foal/core";

import { createConnection } from "typeorm";

export class AppController implements IAppController {
  subControllers = [
    controller("/auth", AuthController),
    controller("/api", ApiController),
    controller("/api/user", UserController),
  ];

  async init() {
    await createConnection();
  }
}
