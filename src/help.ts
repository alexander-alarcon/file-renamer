import { info, warn } from "./utils.ts";

export function printHelp(): void {
  warn(`Usage: file-renamer SOURCE [TARGET] [OPTIONS...]`);
  console.log("Rename the file or directory SOURCE to the TARGET name.");

  info("\nPositional arguments:");
  console.log(
    `  %cSOURCE\t%cThe source file or directory name (required)`,
    "color: #32CD32; font-weight: bold;",
    "color: initial",
  );
  console.log(
    `  %cTARGET\t%cThe target file or directory name (optional, required if no prefix/suffix are provided)`,
    "color: #32CD32; font-weight: bold;",
    "color: initial",
  );

  info("\nOptional flags:");
  console.log(
    `  %c--help, -h\t\t%cShow this help message and exit`,
    "color: #32CD32; font-weight: bold;",
    "color: initial",
  );
  console.log(
    `  %c--prefix PREFIX\t%cPrefix to add to the source name`,
    "color: #32CD32; font-weight: bold;",
    "color: initial",
  );
  console.log(
    `  %c--suffix SUFFIX\t%cSuffix to add to the source name`,
    "color: #32CD32; font-weight: bold;",
    "color: initial",
  );
}
