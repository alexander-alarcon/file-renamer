export type Help = {
  help: true;
};

export type RenameWithPrefixSuffix =
  & {
    help?: false | undefined;
    source: string;
    target?: string;
    prefix?: string;
    suffix?: string;
  }
  & (
    | { target: string }
    | { prefix: string | undefined; suffix: string | undefined }
  );

export type CliArguments = Help | RenameWithPrefixSuffix;
