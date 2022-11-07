import type {Logger as WinstonLoggerType} from 'winston';
import winston from 'winston';
import type Logger from '~api/Shared/Domain/Logger/Logger';

enum Levels {
  debug = 'debug',
  info = 'info',
  error = 'error',
}

export default class WinstonLogger implements Logger {
  private readonly logger: WinstonLoggerType;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.errors({stacks: true}),
        winston.format.splat(),
        winston.format.colorize(),
        winston.format.simple(),
      ),
      transports: [
        new winston.transports.File({
          filename: `logs/${Levels.debug}.log`,
          level: Levels.debug,
        }),
        new winston.transports.File({
          filename: `logs/${Levels.info}.log`,
          level: Levels.info,
        }),
        new winston.transports.File({
          filename: `logs/${Levels.error}.log`,
          level: Levels.error,
        }),
      ],
    });
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: Error): void {
    this.logger.error(message);
  }
}
