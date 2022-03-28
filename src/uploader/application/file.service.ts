import fs from 'fs';

export class FileService {
  async isDirectory(path: string): Promise<boolean> {
    const stats = await this.getPathStat(path);

    if (stats != null) {
      return stats.isDirectory();
    }

    return false;
  }

  async isFile(path: string): Promise<boolean> {
    const stats = await this.getPathStat(path);

    if (stats != null) {
      return stats.isFile();
    }

    return false;
  }

  async getPathStat(path: string): Promise<fs.Stats | null> {
    const exists = await this.checkIfFileExists(path);

    if (exists) {
      const stats = await fs.promises.stat(path);
      return stats;
    }

    return null;
  }

  async checkIfFileExists(path: string): Promise<boolean> {
    try {
      await fs.promises.access(path, fs.constants.F_OK);
      return true;
    } catch (error) {}

    return false;
  }
}
