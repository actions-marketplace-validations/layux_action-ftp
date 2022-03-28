import winston from 'winston';

import { Logger } from '../domain/logger.interface';

export class ConsoleLogger implements Logger {
  private readonly logger: winston.Logger;

  constructor(private readonly name: string) {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.label({ label: this.name }),
        winston.format.align(),
        winston.format.timestamp(),
        winston.format.printf(
          (info) => `${info.timestamp} [${info.level}] ${info.message}`
        )
      ),
      transports: [new winston.transports.Console()],
    });
  }

  log(message: string): void {
    return this.info(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string): void {
    this.logger.error(message);
    this.logger.error(new Error().stack);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}
