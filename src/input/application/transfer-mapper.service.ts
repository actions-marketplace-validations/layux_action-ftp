import { Transfer } from 'src/uploader/domain/transfer.interface';
import { Transfer as InputTransfer } from '../domain/dtos/transfer.dto';

export class TransferMapperService {
  mapTransfers(transfers: Array<InputTransfer>): Array<Transfer> {
    return transfers.map<Transfer>((transfer) => ({
      forceClean: transfer.force_clean,
      ignore: transfer.ignore,
      localPath: transfer.local_path,
      remotePath: transfer.remote_path,
      permissions: transfer.permissions,
    }));
  }
}
