import { assertEquals } from "jsr:@std/assert";
import { assertType, IsExact } from "jsr:@std/testing/types";

import { readArgs } from "../src/args.ts";
import { CliArguments, Help, RenameWithOptions } from "../src/types.ts";

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

      assertType<IsExact<typeof args, Help>>;
      assertEquals(args.help, true);
    });
  },
});

Deno.test({
  name: "Should get help flag using --help",
  fn() {
    mockArgs(["--help"], () => {
      const args = readArgs();

      assertType<IsExact<typeof args, Help>>;
      assertEquals(args.help, true);
    });
  },
});

Deno.test({
  name: "Should get source and target",
  fn() {
    mockArgs(["source.txt", "target.txt"], () => {
      const args: CliArguments = readArgs();

      assertType<IsExact<typeof args, RenameWithOptions>>;

      if (!args.help) {
        assertEquals(args.source, "source.txt");
        assertEquals(args.target, "target.txt");
        assertEquals(args.help, false);
      }
    });
  },
});

Deno.test({
  name: "Should get source and target with prefix",
  fn() {
    mockArgs(["source.txt", "target.txt", "--prefix", "00_"], () => {
      const args: CliArguments = readArgs();

      assertType<IsExact<typeof args, RenameWithOptions>>;

      if (!args.help) {
        assertEquals(args.source, "source.txt");
        assertEquals(args.target, "target.txt");
        assertEquals(args.prefix, "00_");
        assertEquals(args.help, false);
        assertEquals(args.suffix, undefined);
      }
    });
  },
});

Deno.test({
  name:
    "Should target be empty when prefix is provided and target is not provided",
  fn() {
    mockArgs(["source.txt", "", "--prefix", "00_"], () => {
      const args: CliArguments = readArgs();

      assertType<IsExact<typeof args, RenameWithOptions>>;

      if (!args.help) {
        assertEquals(args.source, "source.txt");
        assertEquals(args.target, "");
        assertEquals(args.prefix, "00_");
        assertEquals(args.help, false);
        assertEquals(args.suffix, undefined);
      }
    });
  },
});

Deno.test({
  name: "Should get source and target with suffix",
  fn() {
    mockArgs(["source.txt", "target.txt", "--suffix", "_00"], () => {
      const args: CliArguments = readArgs();

      assertType<IsExact<typeof args, RenameWithOptions>>;

      if (!args.help) {
        assertEquals(args.source, "source.txt");
        assertEquals(args.target, "target.txt");
        assertEquals(args.suffix, "_00");
        assertEquals(args.help, false);
        assertEquals(args.prefix, undefined);
      }
    });
  },
});

Deno.test({
  name:
    "Should target be empty when suffix is provided and target is not provided",
  fn() {
    mockArgs(["source.txt", "", "--suffix", "_00"], () => {
      const args: CliArguments = readArgs();

      assertType<IsExact<typeof args, RenameWithOptions>>;

      if (!args.help) {
        assertEquals(args.source, "source.txt");
        assertEquals(args.target, "");
        assertEquals(args.suffix, "_00");
        assertEquals(args.help, false);
        assertEquals(args.prefix, undefined);
      }
    });
  },
});

Deno.test({
  name: "Should get source and target with prefix and suffix",
  fn() {
    mockArgs(
      ["source.txt", "target.txt", "--prefix", "00_", "--suffix", "_00"],
      () => {
        const args: CliArguments = readArgs();

        assertType<IsExact<typeof args, RenameWithOptions>>;

        if (!args.help) {
          assertEquals(args.source, "source.txt");
          assertEquals(args.target, "target.txt");
          assertEquals(args.prefix, "00_");
          assertEquals(args.suffix, "_00");
          assertEquals(args.help, false);
        }
      },
    );
  },
});

Deno.test({
  name: "Should get source and target is empty with prefix and suffix",
  fn() {
    mockArgs(["source.txt", "", "--prefix", "00_", "--suffix", "_00"], () => {
      const args: CliArguments = readArgs();

      assertType<IsExact<typeof args, RenameWithOptions>>;

      if (!args.help) {
        assertEquals(args.source, "source.txt");
        assertEquals(args.target, "");
        assertEquals(args.prefix, "00_");
        assertEquals(args.suffix, "_00");
        assertEquals(args.help, false);
      }
    });
  },
});

Deno.test({
  name: "Should get only numbers flag",
  fn() {
    mockArgs(["source.txt", "target.txt", "--only-numbers"], () => {
      const args: CliArguments = readArgs();

      assertType<IsExact<typeof args, RenameWithOptions>>;

      if (!args.help) {
        assertEquals(args.source, "source.txt");
        assertEquals(args.target, "target.txt");
        assertEquals(args.onlyNumbers, true);
        assertEquals(args.help, false);
      }
    });
  },
});

Deno.test({
  name: "Should get only numbers flag with empty target",
  fn() {
    mockArgs(["source.txt", "", "--only-numbers"], () => {
      const args: CliArguments = readArgs();

      assertType<IsExact<typeof args, RenameWithOptions>>;

      if (!args.help) {
        assertEquals(args.source, "source.txt");
        assertEquals(args.target, "");
        assertEquals(args.onlyNumbers, true);
        assertEquals(args.help, false);
      }
    });
  },
});
