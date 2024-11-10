export type Help = {
  help: true;
};

export type RenameWithOptions = {
  help?: false | undefined;
  source: string;
  target?: string;
  prefix?: string;
  suffix?: string;
  onlyNumbers?: boolean;
} & (
  | { target: string }
  | { prefix: string | undefined; suffix: string | undefined }
) &
  ({ target: string } | { onlyNumbers: boolean });

export type CliArguments = Help | RenameWithOptions;
