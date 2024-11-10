import { parseArgs } from "jsr:@std/cli/parse-args";

import { CliArguments, RenameWithOptions } from "./types.ts";

export function readArgs(): CliArguments {
  const parsedArgs = parseArgs(Deno.args, {
    boolean: ["help", "only-numbers"],
    string: ["prefix", "suffix"],
    alias: {
      help: ["h"],
      onlyNumbers: ["only-numbers"],
    },
    default: {
      help: false,
      prefix: undefined,
      suffix: undefined,
      onlyNumber: false,
    },
  });

  if (parsedArgs.help) return { help: true };

  const [source, target] = parsedArgs._ as string[];

  return {
    source,
    target,
    help: parsedArgs.help,
    prefix: parsedArgs.prefix,
    suffix: parsedArgs.suffix,
    onlyNumbers: parsedArgs.onlyNumbers,
  } as RenameWithOptions;
}
