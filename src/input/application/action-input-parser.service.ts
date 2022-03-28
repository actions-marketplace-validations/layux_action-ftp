import * as core from '@actions/core';
import YAML from 'yaml';

import { ActionInput } from 'src/input/domain/dtos/action-input.dto';
import { Protocol } from '../domain/enums/protocol.enum';

export class ActionInputParserService {
  getActionInput() {
    const actionInput = new ActionInput();

    actionInput.protocol = core.getInput('protocol') as Protocol;
    actionInput.host = core.getInput('host');
    actionInput.port = parseInt(core.getInput('port'), 10);
    actionInput.username = core.getInput('username');
    actionInput.password = core.getInput('password');
    actionInput.private_key = core.getInput('private_key');
    actionInput.local_root = core.getInput('local_root');
    actionInput.remote_root = core.getInput('remote_root');
    actionInput.passive = core.getBooleanInput('passive');

    if (actionInput.password) core.setSecret(actionInput.password);
    if (actionInput.private_key) core.setSecret(actionInput.private_key);

    const transfers = core.getInput('transfers');
    const parsedTransfers = YAML.parse(transfers);

    actionInput.transfers = parsedTransfers;

    return actionInput;
  }
}
