import { FileUploaderConnectionOptions } from "./file-uploader-connection-options.interface";

export interface FileUploader {
  connect(options: FileUploaderConnectionOptions): Promise<boolean>;
  pathExists(remotePath: string): Promise<boolean>;
  createDirectory(remotePath: string): Promise<boolean>;
  deleteDirectory(remotePath: string): Promise<boolean>;
  uploadFile(localPath: string, remotePath: string): Promise<boolean>;
}