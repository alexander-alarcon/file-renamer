import { basename, extname } from "jsr:@std/path";

import { RenameWithPrefixSuffix } from "./types.ts";
import { validateArgs } from "./utils/validateRename.ts";

function addPrefix(source: string, prefix: string) {
  const ext = extname(source);
  const base = basename(source, ext);

  return `${prefix}${base}${ext}`;
}

function addSuffix(source: string, suffix: string) {
  const ext = extname(source);
  const base = basename(source, ext);

  return `${base}${suffix}${ext}`;
}

export async function rename(args: RenameWithPrefixSuffix): Promise<void> {
  const { source, target, prefix, suffix } = args;

  validateArgs(args);

  let finalTarget: string | undefined = target;
  finalTarget ??= source;

  if (prefix) {
    finalTarget = addPrefix(finalTarget, prefix);
  }

  if (suffix) {
    finalTarget = addSuffix(finalTarget, suffix);
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
