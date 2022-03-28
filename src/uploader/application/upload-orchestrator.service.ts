import glob from 'glob';
import { FileService } from './file.service';

export class UploadOrchestratorService {
  private readonly fileService = new FileService();

  async uploadFiles() {

  }

  private async getFilesToUpload(localPath: string, ignoreFiles: Array<string>) {
    // If path is a directory when we want all the files inside it
    // except the ones that are in ignoreFiles
    const isDirectory = await this.fileService.isDirectory(localPath);

    if (isDirectory) {
      // Get all files from directory that
    }

    // If the path is a file directly then it makes sense to add it to the list
    const isFile = await this.fileService.isFile(localPath);

    if (isFile) {
      // Return only the file
    }

    // Otherwise it may be a pattern to match files
    // look for all files matching and return them in an array
    return glob.sync(localPath, { ignore: ignoreFiles });
  }
}
