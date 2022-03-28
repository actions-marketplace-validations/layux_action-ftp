import path from 'path';
import { LoggerFactory } from 'src/logger/application/logger.factory';
import SftpClient from 'ssh2-sftp-client';

import { FileUploaderConnectionOptions } from '../domain/file-uploader-connection-options.interface';
import { FileUploader } from '../domain/file-uploader.interface';

export class SftpFileUploader implements FileUploader {
  private readonly logger = LoggerFactory.getLogger(SftpFileUploader.name);
  private readonly sftpClient = new SftpClient();
  private localRootPath: string = '.';
  private remoteRootPath: string = '.';

  async connect(options: FileUploaderConnectionOptions): Promise<boolean> {
    try {
      await this.sftpClient.connect({
        host: options.host,
        port: options.port,
        username: options.username,
        password: options.password,
        privateKey: options.privateKey,
        passphrase: options.password,
      });

      this.localRootPath = options.localRootPath;
      this.remoteRootPath = options.remoteRootPath;

      this.logger.info('Successfully connected to server');
    } catch (error) {
      this.logger.error(`Error connecting to SFTP server: ${error}`);
    }

    return false;
  }

  async pathExists(remotePath: string): Promise<boolean> {
    const transformedRemotePath = this.transformPath(remotePath, true);

    try {
      const exists = await this.sftpClient.exists(transformedRemotePath);

      if (exists) {
        this.logger.debug(`Path ${transformedRemotePath} exists`);
        return true;
      }
    } catch (error) {
      this.logger.error(
        `Error checking if path ${transformedRemotePath} exists: ${error}`
      );
    }

    return false;
  }

  async createDirectory(remotePath: string): Promise<boolean> {
    const transformedRemotePath = this.transformPath(remotePath, true);

    try {
      await this.sftpClient.mkdir(transformedRemotePath, true);
      this.logger.info(
        `Successfully created directory ${transformedRemotePath}`
      );

      return true;
    } catch (error) {
      this.logger.error(
        `Error creating directory ${transformedRemotePath}: ${error}`
      );
    }

    return false;
  }

  async deleteDirectory(remotePath: string): Promise<boolean> {
    const transformedRemotePath = this.transformPath(remotePath, true);

    try {
      await this.sftpClient.rmdir(transformedRemotePath, true);
      this.logger.info(
        `Successfully deleted directory ${transformedRemotePath}`
      );

      return true;
    } catch (error) {
      this.logger.error(
        `Error deleting directory ${transformedRemotePath}: ${error}`
      );
    }

    return false;
  }

  async uploadFile(localPath: string, remotePath: string): Promise<boolean> {
    const transformedRemotePath = this.transformPath(remotePath, true);
    const transformedLocalPath = this.transformPath(localPath, false);

    try {
      await this.sftpClient.fastPut(
        transformedLocalPath,
        transformedRemotePath
      );
      this.logger.info(
        `Successfully uploaded file ${transformedLocalPath} -> ${transformedRemotePath}`
      );

      return true;
    } catch (error) {
      this.logger.error(
        `Error uploading file ${transformedLocalPath}: ${error}`
      );
    }

    return false;
  }

  private transformPath(sourcePath: string, isRemote: boolean): string {
    if (isRemote) {
      return path.join(this.remoteRootPath, sourcePath);
    }

    return path.join(this.localRootPath, sourcePath);
  }
}
