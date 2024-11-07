import { parseArgs } from "jsr:@std/cli/parse-args";

interface CliFlagsHelp {
  help: true;
}

interface CliFlagsDefault {
  help?: false;
  name: string;
}

export type CliFlags = CliFlagsHelp | CliFlagsDefault;

export function readArgs(): CliFlags {
  const flags = parseArgs(Deno.args, {
    boolean: ["help"],
    string: ["name"],
    alias: {
      help: ["h"],
      name: ["n"],
    },
  });

  if (flags.help) return { help: true };

  return { name: flags.name ?? "World", help: false };
}
