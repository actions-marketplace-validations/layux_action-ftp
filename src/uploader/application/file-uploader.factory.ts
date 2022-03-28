import { FileUploader } from "../domain/file-uploader.interface";
import { FileService } from "../infrastructure/file.service";
import { SftpFileUploader } from "../infrastructure/sftp-file-uploader.service";

export class FileUploaderFactory {
  static getFileUploader(): FileUploader {
    return new SftpFileUploader(new FileService());
  }
}