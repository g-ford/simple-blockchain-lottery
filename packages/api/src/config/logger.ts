import * as winston from "winston";
export const log = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.cli()
  ),
  transports: [new winston.transports.Console()]
});
