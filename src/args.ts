import { parseArgs } from "jsr:@std/cli/parse-args";

import { CliArguments, RenameWithPrefixSuffix } from "./types.ts";

export function readArgs(): CliArguments {
  const flags = parseArgs(Deno.args, {
    boolean: ["help"],
    string: ["prefix", "suffix"],
    alias: {
      help: ["h"],
    },
  });

  if (flags.help) return { help: true };

  const [source, target] = flags._ as string[];

  return {
    help: false,
    source,
    target,
    prefix: flags.prefix ?? undefined,
    suffix: flags.suffix ?? undefined,
  } as RenameWithPrefixSuffix;
}
