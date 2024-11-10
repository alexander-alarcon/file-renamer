# File Renamer CLI

Simple file renamer using Deno.

## Description

This CLI tool is designed to make it easier for you to rename files and
directories in a flexible and customizable way. You can add prefixes, suffixes,
or even remove non-numeric characters from filenames.

## Prerequisites

Make sure you have [Deno](https://deno.land/) installed on your machine before
running the project.

## Installation

1. Clone the repository.

```bash
git clone https://github.com/alexander-alarcon/file-renamer.git
```

2. Install dependencies.

```bash
cd file-renamer
deno install
```

## Usage

```bash
deno task dev -WR SOURCE [TARGET] [OPTIONS...]
```

- Positional arguments:

  | Argument | Description                                                             |
  | -------- | ----------------------------------------------------------------------- |
  | SOURCE   | Path to the file or directory to be renamed.                            |
  | TARGET   | New name of the file or directory. (optional: if any flag is provided). |

- Flags:

  | Flag             | Default | Description                                      |
  | ---------------- | ------- | ------------------------------------------------ |
  | `--prefix`       | ""      | Add a prefix to the name.                        |
  | `--suffix`       | ""      | Add a suffix to the name.                        |
  | `--only-numbers` | false   | Remove all non-numeric characters from the name. |

## Examples

- Rename a file or directory.

```bash
deno task dev -WR <SOURCE_FILE> <TARGET_FILE>

# file1.txt will be renamed to file2.txt
deno task dev -WR file1.txt file2.txt

# directory1 will be renamed to directory2
deno task dev -WR directory1/ directory2/
```

- Add a prefix or suffix to the name.

```bash
# file1.txt will be renamed to prefix_file1.txt
deno task dev -WR file1.txt --prefix=prefix_

# file1.txt will be renamed to file1_suffix.txt
deno task dev -WR file1.txt --suffix=_suffix

# file1.txt will be renamed to prefix_file1_suffix.txt
deno task dev -WR file1.txt --prefix=prefix_ --suffix=_suffix

# file1.txt will be renamed to prefix_newfile.txt
deno task dev -WR file1.txt newfile.txt --prefix=prefix_
```

- Remove non numeric characters from the name.

```bash
# file1.txt will be renamed to 1.txt
deno task dev -WR file1.txt --only-numbers
```

## Roadmap

This section outlines the planned features and improvements for the File Renamer CLI. If you have ideas or want to contribute, feel free to open an issue or submit a pull request.
Planned Features

- [ ] Batch Rename
      Add the ability to rename multiple files at once by providing a directory or a list of files. This will allow for renaming several files based on a pattern or rule.

- [ ] Replace Part of the Name
      Introduce an option to replace specific parts of a filename. This feature will allow users to search for a substring in filenames and replace it with a new string.

- [ ] Lowercase / Uppercase
      Add flags to convert filenames to lowercase or uppercase, making it easier to standardize file names.

- [ ] Regex-Based Renaming
      Implement support for regular expressions (regex) in filename transformations. Users could provide a regex pattern to match and rename files based on complex patterns.
