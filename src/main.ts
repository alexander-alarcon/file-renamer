import { type CliFlags, readArgs } from "./args.ts";
import { printHelp } from "./help.ts";

function main(): void {
  const flags: CliFlags = readArgs();

  if (flags.help) printHelp();

  Deno.exit(0);
}

main();
