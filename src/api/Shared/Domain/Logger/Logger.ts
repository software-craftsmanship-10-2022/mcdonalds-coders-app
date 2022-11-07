export default interface {
  debug(message: string): void;
  info(message: string): void;
  error(message: Error): void;
}
