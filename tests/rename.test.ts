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
      () =>
        rename({
          source: "some-file.txt",
          target: "new-name.txt",
        }),
      Deno.errors.NotCapable,
    );
  },
});

Deno.test({
  name: "Should throw error if source is not provided",
  fn() {
    assertRejects(
      () =>
        rename({
          source: "",
          target: "",
        }),
      Error,
      "SOURCE argument is required.",
    );
  },
});

Deno.test({
  name: "Should throw error if source and target are equal",
  fn() {
    assertRejects(
      () => rename({ source: "a.txt", target: "a.txt" }),
      Error,
      "SOURCE and TARGET must be different.",
    );
  },
});

Deno.test({
  name: "Should throw error if prefix is empty or consist of only whitespace",
  fn() {
    assertRejects(
      () => rename({ source: "a.txt", prefix: "    ", suffix: "11" }),
      Error,
      "Prefix cannot be empty or consist of only whitespace.",
    );
  },
});

Deno.test({
  name: "Should throw error if suffix is empty or consist of only whitespace",
  fn() {
    assertRejects(
      () => rename({ source: "a.txt", prefix: "11", suffix: "\t" }),
      Error,
      "Suffix cannot be empty or consist of only whitespace.",
    );
  },
});

Deno.test({
  name: "Should throw error if target is empty when prefix and suffix are not provided",
  fn() {
    assertRejects(
      () => rename({ source: "a.txt", target: "", prefix: "", suffix: "" }),
      Error,
      "When no prefix or suffix is provided, target is required and cannot be empty or consist of only whitespace.",
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
      () => rename({ source: "not-found.txt", target: "b.txt" }),
      Error,
      `File or directory "not-found.txt" not found.`,
    );
  },
});
