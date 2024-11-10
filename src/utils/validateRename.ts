import { RenameWithOptions } from "../types.ts";

const OPTIONS = {
  PREFIX: "prefix",
  SUFFIX: "suffix",
  ONLY_NUMBERS: "onlyNumbers",
} as const;

function sourceIsRequired({ source }: RenameWithOptions): void {
  if (!source) {
    throw new Error("SOURCE argument is required.");
  }
}

function sourceAndTargetEquals({ source, target }: RenameWithOptions): void {
  if (source === target) {
    throw new Error("SOURCE and TARGET must be different.");
  }
}

function validateTargetIfNoKeysPresent(
  args: RenameWithOptions,
  keys: (keyof RenameWithOptions)[],
): void {
  const hasAnyKey = keys.some((key) => key in args && args[key]);

  if (!hasAnyKey && (!args.target || !args.target?.trim().length)) {
    throw new Error(
      "When any flag is provided, target is required and cannot be empty or consist of only whitespace.",
    );
  }
}

function validateOptions(args: RenameWithOptions): void {
  validateTargetIfNoKeysPresent(args, Object.values(OPTIONS));
}

export function validateArgs(args: RenameWithOptions): void {
  sourceIsRequired(args);
  sourceAndTargetEquals(args);
  validateOptions(args);
}
