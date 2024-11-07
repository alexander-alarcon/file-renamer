function sourceAndTargetEquals(source: string, target: string): void {
  if (source === target) {
    throw new Error("SOURCE and TARGET must be different.");
  }
}

function validateArgs(source: string, target: string): void {
  sourceAndTargetEquals(source, target);
}

export async function rename(source: string, target: string): Promise<void> {
  validateArgs(source, target);

  try {
    await Deno.rename(source, target);
  } catch (e: unknown) {
    if (e instanceof Deno.errors.NotFound) {
      throw new Error(`File or directory "${source}" not found.`);
    }

    throw new Error(
      `Unexpected error renaming "${source}" -> "${target}": ${e}`,
    );
  }
}
