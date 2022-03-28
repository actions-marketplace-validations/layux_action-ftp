import * as core from '@actions/core';
import YAML from 'yaml';

import { ActionInput } from 'src/input/domain/dtos/action-input.dto';
import { Protocol } from '../domain/enums/protocol.enum';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Transfer } from '../domain/dtos/transfer.dto';

export class ActionInputParserService {
  getActionInput() {
    const actionInput = new ActionInput();

    actionInput.protocol = core.getInput('protocol') as Protocol || Protocol.Ftp;
    actionInput.host = core.getInput('host');
    actionInput.port = parseInt(core.getInput('port'), 10) || 21;
    actionInput.username = core.getInput('username');
    actionInput.password = core.getInput('password');
    actionInput.private_key = core.getInput('private_key');
    actionInput.local_root = core.getInput('local_root') || '.';
    actionInput.remote_root = core.getInput('remote_root') || '.';
    actionInput.passive = core.getBooleanInput('passive') || true;

    if (actionInput.password) core.setSecret(actionInput.password);
    if (actionInput.private_key) core.setSecret(actionInput.private_key);

    const transfers = core.getInput('transfers');
    const parsedTransfers = YAML.parse(transfers);

    actionInput.transfers = plainToInstance<Transfer, Array<Transfer>>(Transfer, parsedTransfers);

    return actionInput;
  }
}
