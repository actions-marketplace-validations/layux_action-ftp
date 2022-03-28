import { validate } from 'class-validator';
import { LoggerFactory } from 'src/logger/application/logger.factory';

import { ActionInput } from '../domain/dtos/action-input.dto';

export class ActionInputValidator {
  private readonly logger = LoggerFactory.getLogger(ActionInputValidator.name);

  async validateActionInput(actionInput: ActionInput) {
    const validateErrors = await validate(actionInput, {
      forbidUnknownValues: true,
    });

    if (validateErrors.length > 0) {
      const errorMessages = validateErrors.map((error) => error.toString());
      this.logger.error(`Action input validation failed: ${errorMessages}`);
      throw new Error(errorMessages.join('\n'));
    }

    this.logger.info('Action input validation passed');
  }
}
