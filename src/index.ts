import * as core from '@actions/core';
import 'reflect-metadata';
import { ActionInputParserService } from './input/application/action-input-parser.service';
import { ActionInputValidator } from './input/application/action-input-validator.service';

const run = async () => {
  try {
    // Get the action input transformed into its own class
    const inputParserService = new ActionInputParserService();
    const actionInput = inputParserService.getActionInput();

    // Validate the action input
    const inputValidatorService = new ActionInputValidator();
    await inputValidatorService.validateActionInput(actionInput);

    // Execute action with the input values
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
};

run();
