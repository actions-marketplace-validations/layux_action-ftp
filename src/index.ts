import * as core from '@actions/core';
import YAML from 'yaml';
import 'reflect-metadata';
import { ActionInput } from './dtos/action-input.dto';
import { Protocol } from './enums/protocol.enum';
import { validate } from 'class-validator';

const run = async () => {
  try {
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

    core.setSecret(actionInput.password);
    core.setSecret(actionInput.private_key);

    const transfers = core.getInput('transfers');
    const parsedTransfers = YAML.parse(transfers);

    actionInput.transfers = parsedTransfers;

    const validateErrors = await validate(actionInput, {
      stopAtFirstError: true,
      whitelist: true,
    });

    console.log(`validateErrors: ${JSON.stringify(validateErrors)}`);
    console.log(`parsedTransfers: ${JSON.stringify(parsedTransfers)}`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
};

run();
