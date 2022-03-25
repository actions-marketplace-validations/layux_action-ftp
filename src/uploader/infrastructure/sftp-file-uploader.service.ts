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
    } catch (error) {
      this.logger.error(`Error connecting to SFTP server: ${error}`);
    }

    return false;
  }

  async upload(localPath: string, remotePath: string): Promise<boolean> {
    return false;
  }
}
