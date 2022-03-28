export interface Transfer {
  localPath: string;
  remotePath: string;
  forceClean: boolean;
  permissions: string;
  ignore: Array<string>;
}