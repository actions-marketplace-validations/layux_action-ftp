import { Logger } from '../domain/logger.interface';
import { ConsoleLogger } from '../infrastructure/console-logger.implementation';

export class LoggerFactory {
  static getLogger(name: string): Logger {
    return new ConsoleLogger(name);
  }
}
