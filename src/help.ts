export function printHelp(): void {
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

  Deno.exit(0);
}
