import { parseArgs } from "jsr:@std/cli/parse-args";

interface CliFlagsHelp {
  help: true;
}

interface CliFlagsDefault {
  help?: false;
  name: string;
}

type CliFlags = CliFlagsHelp | CliFlagsDefault;

function printHelp(): void {
  console.log(
    `%cUsage: file-renamer [OPTIONS...]`,
    "color: #FFA500; font-weight: bold;",
  );
  console.log(`%c\nOptional flags:`, "color: #00BFFF; font-weight: bold;");
  console.log(
    `  %c--help, -h  %cShow this help message and exit`,
    "color: #32CD32; font-weight: bold;",
    "color: initial",
  );
  console.log(
    `  %c--name, -n  %cName of the person to greet (default: World)`,
    "color: #32CD32; font-weight: bold;",
    "color: initial",
  );

  Deno.exit(0);
}

function greet(name: string = "World"): void {
  console.log(`Hello ${name}!`);

  Deno.exit(0);
}

function readArgs(): CliFlags {
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

function main(): void {
  const flags: CliFlags = readArgs();

  if (flags.help) printHelp();
  else greet(flags.name);
}

main();
