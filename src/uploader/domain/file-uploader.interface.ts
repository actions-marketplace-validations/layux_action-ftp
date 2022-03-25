import { FileUploaderConnectionOptions } from "./file-uploader-connection-options.interface";

export interface FileUploader {
  connect(options: FileUploaderConnectionOptions): Promise<boolean>;
  upload(localPath: string, remotePath: string): Promise<boolean>;
}