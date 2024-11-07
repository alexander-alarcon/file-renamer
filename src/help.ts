import { info, warn } from "./utils.ts";

export function printHelp(): void {
  warn(`Usage: file-renamer [OPTIONS...] SOURCE TARGET`);
  console.log("Rename the file or directory SOURCE to the TARGET name.");
  info("\nOptional flags:");
  console.log(
    `  %c--help, -h  %cShow this help message and exit`,
    "color: #32CD32; font-weight: bold;",
    "color: initial",
  );
}
