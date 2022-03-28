import { FileUploaderConnectionOptions } from "./file-uploader-connection-options.interface";

export interface FileUploader {
  connect(options: FileUploaderConnectionOptions): Promise<boolean>;
  getFilesToUpload(path: string, ignore: Array<string>): Promise<Array<string>>;
  pathExists(remotePath: string): Promise<boolean>;
  createDirectory(remotePath: string): Promise<boolean>;
  deleteDirectory(remotePath: string): Promise<boolean>;
  uploadFile(localPath: string, remotePath: string): Promise<boolean>;
}