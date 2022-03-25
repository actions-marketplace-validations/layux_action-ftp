export interface Logger {
  log(message: string): void;
  info(message: string): void;
  error(message: string): void;
  debug(message: string): void;
}
