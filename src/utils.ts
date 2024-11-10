export function warn(message: string): void {
  console.warn(`%c${message}`, "color: #FFA500; font-weight: bold;");
}

export function error(message: string): void {
  console.error(`%cERROR: ${message}`, "color: red; font-weight: bold;");
}

export function info(message: string): void {
  console.info(`%c${message}`, "color: #00BFFF; font-weight: bold;");
}
