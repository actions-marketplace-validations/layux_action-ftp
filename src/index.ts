import * as core from '@actions/core';
import YAML from 'yaml';

const run = async () => {
  try {
    const protocol = core.getInput('protocol');
    const host = core.getInput('host');
    const port = core.getInput('port');
    const username = core.getInput('username');
    const password = core.getInput('password');
    const privateKey = core.getInput('private_key');
    const localRoot = core.getInput('local_root');
    const remoteRoot = core.getInput('remote_root');
    const transfers = core.getInput('transfers');
    const passive = core.getInput('passive');

    core.setSecret(password);
    core.setSecret(privateKey);

    console.log(`protocol: ${protocol}`);
    console.log(`transfers: ${transfers}`);

    const parsedTransfers = YAML.parse(transfers);
    console.log(`parsedTransfers: ${JSON.stringify(parsedTransfers)}`);

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
};

run();
