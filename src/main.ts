import { readArgs } from "./args.ts";
import { printHelp } from "./help.ts";
import { rename } from "./rename.ts";
import { CliArguments } from "./types.ts";
import { error } from "./utils.ts";

async function main(): Promise<void> {
  const args: CliArguments = readArgs();

  if (args.help) {
    printHelp();

    Deno.exit(0);
  }

  try {
    await rename(args);
  } catch (e: unknown) {
    if (e instanceof Error) {
      error(e.message);
    } else {
      error("An unexpected error occurred.");
    }

    Deno.exit(1);
  }

  Deno.exit(0);
}

main();
