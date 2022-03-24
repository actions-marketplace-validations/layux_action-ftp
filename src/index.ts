import actions from '@actions/core';

const run = async () => {
  actions.setOutput('result', 'Hello World');
};

run();
