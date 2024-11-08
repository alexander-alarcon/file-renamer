import { assertRejects } from "jsr:@std/assert";

import { rename } from "../src/rename.ts";

Deno.test({
  name: "Should throw error if insufficient permissions",
  permissions: {
    read: ["some-file.txt"],
    write: [],
  },
  fn() {
    assertRejects(
      () => rename("some-file.txt", "new-name.txt"),
      Deno.errors.NotCapable,
    );
  },
});

Deno.test({
  name: "Should throw error if source is not found",
  permissions: {
    read: ["not-found.txt", "b.txt"],
    write: ["not-found.txt", "b.txt"],
  },
  fn() {
    assertRejects(
      () => rename("not-found.txt", "b.txt"),
      Error,
      `File or directory "not-found.txt" not found.`,
    );
  },
});

Deno.test({
  name: "Should throw error if source and target are equal",
  fn() {
    assertRejects(
      () => rename("a.txt", "a.txt"),
      Error,
      "SOURCE and TARGET must be different.",
    );
  },
});
