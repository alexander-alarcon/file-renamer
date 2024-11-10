import { basename, extname } from "jsr:@std/path";

import { RenameWithOptions } from "./types.ts";
import { validateArgs } from "./utils/validateRename.ts";

function removeNonNumeric(source: string) {
  const ext = extname(source);
  const base = basename(source, ext);

  return `${base.replace(/\D/g, "")}${ext}`;
}

function addPrefix(source: string, prefix: string) {
  const ext = extname(source);
  const base = basename(source, ext);

  return `${prefix}${base}`;
}

function addSuffix(source: string, suffix: string) {
  const ext = extname(source);
  const base = basename(source, ext);

  return `${base}${suffix}`;
}

export async function rename(args: RenameWithOptions): Promise<void> {
  const { source, target, prefix, suffix, onlyNumbers } = args;

  validateArgs(args);

  let finalTarget: string | undefined = target;
  finalTarget ??= source;
  const ext = extname(source);

  if (onlyNumbers) {
    finalTarget = removeNonNumeric(finalTarget);
  }

  if (prefix) {
    finalTarget = addPrefix(finalTarget, prefix);
  }

  if (suffix) {
    finalTarget = addSuffix(finalTarget, suffix);
  }

  if (finalTarget.trim().length === 0 || finalTarget === ext) {
    throw new Error(
      "Final target cannot be empty or consist of only whitespace.",
    );
  }

  try {
    await Deno.rename(source, finalTarget);
  } catch (e: unknown) {
    if (e instanceof Deno.errors.NotFound) {
      throw new Error(`File or directory "${source}" not found.`);
    }

    if (e instanceof Error) {
      throw e;
    }

    throw new Error(
      `Unexpected error renaming "${source}" -> "${target}": ${e}`,
    );
  }
}
