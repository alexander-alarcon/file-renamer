import { assertEquals } from "jsr:@std/assert";
import { assertThrows } from "jsr:@std/assert/throws";

import { type CliArguments, readArgs } from "../src/args.ts";

function getArgs(): string[] {
  return Deno.args;
}

function mockArgs(args: string[], cb: () => void): void {
  const originalArgs = getArgs();

  Object.defineProperty(Deno, "args", {
    value: args,
    configurable: true,
  });

  cb();

  Object.defineProperty(Deno, "args", {
    value: originalArgs,
    configurable: true,
  });
}

Deno.test({
  name: "Should get help flag using -h",
  fn() {
    mockArgs(["-h"], () => {
      const args = readArgs();

      assertEquals(args.help, true);
    });
  },
});

Deno.test({
  name: "Should get help flag using --help",
  fn() {
    mockArgs(["--help"], () => {
      const args = readArgs();

      assertEquals(args.help, true);
    });
  },
});

Deno.test({
  name: "Should get source and target",
  fn() {
    mockArgs(["source.txt", "target.txt"], () => {
      const args: CliArguments = readArgs();

      if (!args.help && args.source && args.target) {
        assertEquals(args.source, "source.txt");
        assertEquals(args.target, "target.txt");
        assertEquals(args.help, false);
      }
    });
  },
});

Deno.test({
  name: "Should throw error if source is missing",
  fn() {
    mockArgs(["", "target.txt"], () => {
      assertThrows(
        readArgs,
        Error,
        "Both SOURCE and TARGET arguments are required.",
      );
    });
  },
});

Deno.test({
  name: "Should throw error if target is missing",
  fn() {
    mockArgs(["source.txt", ""], () => {
      assertThrows(
        readArgs,
        Error,
        "Both SOURCE and TARGET arguments are required.",
      );
    });
  },
});

Deno.test({
  name: "Should throw error if source and target are missing",
  fn() {
    mockArgs(["", ""], () => {
      assertThrows(
        readArgs,
        Error,
        "Both SOURCE and TARGET arguments are required.",
      );
    });
  },
});
