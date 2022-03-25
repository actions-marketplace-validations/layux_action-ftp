import { validate } from "class-validator";

import { ActionInput } from "../domain/dtos/action-input.dto";

export class ActionInputValidator {
  async validateActionInput(actionInput: ActionInput) {
    const validateErrors = await validate(actionInput, {
      forbidUnknownValues: true,
    });

    if (validateErrors.length > 0) {
      const errorMessages = validateErrors.map((error) => error.toString());
      throw new Error(errorMessages.join('\n'));
    }
  }
}
