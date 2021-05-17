import "source-map-support/register";

// std
import * as http from "http";

import { Builder, Nuxt } from "nuxt";
// 3p
import { Config, createApp, displayServerURL } from "@foal/core";

// App
import { AppController } from "./app/app.controller";

// ...

// Import and Set Nuxt.js options
const config = require("../../frontend/nuxt.config.js");
config.dev = Config.get("settings.debug", "boolean", true);

async function main() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  const app = await createApp(AppController, {
    postMiddlewares: [nuxt.render],
  });

  const httpServer = http.createServer(app);
  const port = Config.get("port", "number", 3001);
  httpServer.listen(port, () => displayServerURL(port));
}

main().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
