import { parseArgs } from "jsr:@std/cli/parse-args";

interface CliFlagsHelp {
  help: true;
}

interface CliArgs {
  source: string;
  target: string;
}

interface CliFlagsDefault {
  help?: false;
}

export type CliArguments = CliFlagsHelp | (CliFlagsDefault & CliArgs);

export function readArgs(): CliArguments {
  const flags = parseArgs(Deno.args, {
    boolean: ["help"],
    alias: {
      help: ["h"],
    },
  });

  if (flags.help) return { help: true };

  const [source, target] = flags._ as string[];

  if (!source || !target) {
    throw new Error("Both SOURCE and TARGET arguments are required.");
  }

  return { help: false, source, target } as CliArguments;
}
