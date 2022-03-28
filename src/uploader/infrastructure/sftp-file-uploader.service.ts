import { LoggerFactory } from 'src/logger/application/logger.factory';
import SftpClient from 'ssh2-sftp-client';

import { FileUploaderConnectionOptions } from '../domain/file-uploader-connection-options.interface';
import { FileUploader } from '../domain/file-uploader.interface';

export class SftpFileUploader implements FileUploader {
  private readonly logger = LoggerFactory.getLogger(SftpFileUploader.name);
  private readonly sftpClient = new SftpClient();

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

      this.logger.info('Successfully connected to server');
    } catch (error) {
      this.logger.error(`Error connecting to SFTP server: ${error}`);
    }

    return false;
  }

  async pathExists(remotePath: string): Promise<boolean> {
    try {
      const exists = await this.sftpClient.exists(remotePath);

      if (exists) {
        this.logger.debug(`Path ${remotePath} exists`);
        return true;
      }
    } catch (error) {
      this.logger.error(
        `Error checking if path ${remotePath} exists: ${error}`
      );
    }

    return false;
  }

  async createDirectory(remotePath: string): Promise<boolean> {
    try {
      await this.sftpClient.mkdir(remotePath, true);
      this.logger.info(`Successfully created directory ${remotePath}`);

      return true;
    } catch (error) {
      this.logger.error(`Error creating directory ${remotePath}: ${error}`);
    }

    return false;
  }

  async deleteDirectory(remotePath: string): Promise<boolean> {
    try {
      await this.sftpClient.rmdir(remotePath, true);
      this.logger.info(`Successfully deleted directory ${remotePath}`);

      return true;
    } catch (error) {
      this.logger.error(`Error deleting directory ${remotePath}: ${error}`);
    }

    return false;
  }

  async uploadFile(localPath: string, remotePath: string): Promise<boolean> {
    return false;
  }
}
