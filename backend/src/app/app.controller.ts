import { ApiController, AuthController } from "./controllers";
import { IAppController, controller } from "@foal/core";

import { createConnection } from "typeorm";

export class AppController implements IAppController {
  subControllers = [
    controller("/auth", AuthController),
    controller("/api", ApiController),
  ];

  async init() {
    await createConnection();
  }
}
