import { RenameWithPrefixSuffix } from "../types.ts";

function sourceIsRequired({ source }: RenameWithPrefixSuffix): void {
  if (!source) {
    throw new Error("SOURCE argument is required.");
  }
}

function sourceAndTargetEquals({
  source,
  target,
}: RenameWithPrefixSuffix): void {
  if (source === target) {
    throw new Error("SOURCE and TARGET must be different.");
  }
}

function validateOptions({
  target,
  prefix,
  suffix,
}: RenameWithPrefixSuffix): void {
  if (prefix && !prefix.trim().length) {
    throw new Error("Prefix cannot be empty or consist of only whitespace.");
  }

  if (suffix && !suffix.trim().length) {
    throw new Error("Suffix cannot be empty or consist of only whitespace.");
  }

  if (!prefix && !suffix && (!target || !target?.trim().length)) {
    throw new Error(
      "When no prefix or suffix is provided, target is required and cannot be empty or consist of only whitespace.",
    );
  }
}

export function validateArgs(args: RenameWithPrefixSuffix): void {
  sourceIsRequired(args);
  sourceAndTargetEquals(args);
  validateOptions(args);
}
