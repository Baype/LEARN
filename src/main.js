import { web } from "./application/web.js";
import { logger } from "./application/logging.js";

web.listen(3002, () => {
  logger.info("App start");
});
