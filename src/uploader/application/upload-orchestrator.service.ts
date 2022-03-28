import glob from 'glob';
import { LoggerFactory } from 'src/logger/application/logger.factory';
import { FileUploader } from '../domain/file-uploader.interface';
import { Transfer } from '../domain/transfer.interface';
import { FileService } from './file.service';

export class UploadOrchestratorService {
  private readonly logger = LoggerFactory.getLogger(
    UploadOrchestratorService.name
  );
  private readonly fileService = new FileService();

  constructor(private readonly fileUploader: FileUploader) {}

  async uploadFiles(transfers: Array<Transfer>) {
    for (const transfer of transfers) {
      // Get the files to upload
      const filesToUpload = await this.getFilesToUpload(
        transfer.localPath,
        transfer.ignore
      );

      // If there's no files to upload then we can skip this transfer
      if (!filesToUpload.length) {
        this.logger.warn(
          `Transfer detected no files to upload for ${transfer.localPath}`
        );
        continue;
      }

      // If transfer is marked as forceClean then we need to delete the remote directory first
      if (transfer.forceClean) {
        await this.fileUploader.deleteDirectory(transfer.remotePath);
      }

      // Ensure that the remote directory exists
      const remotePathExists = await this.fileUploader.pathExists(
        transfer.remotePath
      );

      if (!remotePathExists) {
        await this.fileUploader.createDirectory(transfer.remotePath);
      }

      // Upload the files
      for (const fileToUpload of filesToUpload) {
        const uploaded = await this.fileUploader.uploadFile(
          fileToUpload,
          transfer.remotePath
        );

        if (uploaded) {
          this.logger.info(
            `Successfully uploaded ${fileToUpload} to ${transfer.remotePath}`
          );
        } else {
          this.logger.error(
            `Failed to upload ${fileToUpload} to ${transfer.remotePath}`
          );
        }
      }
    }
  }

  private async getFilesToUpload(
    localPath: string,
    ignoreFiles: Array<string>
  ) {
    // If the path is a file directly then it makes sense to add it to the list
    const isFile = await this.fileService.isFile(localPath);

    if (isFile) {
      return [localPath];
    }

    // Otherwise it may be a pattern to match files
    // look for all files matching and return them in an array
    return glob.sync(localPath, { ignore: ignoreFiles });
  }
}
